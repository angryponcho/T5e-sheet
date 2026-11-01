/*
 * T5e migration helper: dump a character's attributes.
 *
 * Read-only. It does not change any character.
 *
 * Install: Game Settings > Mod (API) Scripts > New Script, paste this file, save.
 * Use (in chat, as the GM):
 *   !t5e-dump                 dumps the character for each selected token
 *   !t5e-dump Wren Halloway   dumps the character with that exact name
 *
 * For each character it creates (or overwrites) a handout called
 * "T5e dump: <character name>" holding every attribute as JSON, repeating
 * sections included. Open the handout, copy the text, and send it over.
 */
on('ready', () => {
  'use strict';

  const esc = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const dumpCharacter = (character) => {
    const attrs = findObjs({ _type: 'attribute', _characterid: character.id });
    const data = {
      character: character.get('name'),
      exportedAt: new Date().toISOString(),
      attributeCount: attrs.length,
      attributes: {},
      repeating: {}
    };

    attrs
      .sort((a, b) => a.get('name').localeCompare(b.get('name')))
      .forEach((a) => {
        const name = a.get('name');
        const value = { current: a.get('current') };
        if (a.get('max') !== '') value.max = a.get('max');

        // repeating_<section>_<rowid>_<field>; row ids start with "-"
        const m = name.match(/^repeating_(.+?)_(-[A-Za-z0-9_-]{19})_(.+)$/);
        if (m) {
          const [, section, rowId, field] = m;
          data.repeating[section] = data.repeating[section] || {};
          data.repeating[section][rowId] = data.repeating[section][rowId] || {};
          data.repeating[section][rowId][field] = value;
        } else {
          data.attributes[name] = value;
        }
      });

    const title = `T5e dump: ${character.get('name')}`;
    let handout = findObjs({ _type: 'handout', name: title })[0];
    if (!handout) {
      handout = createObj('handout', { name: title, inplayerjournals: '', archived: false });
    }
    handout.set('notes', `<pre>${esc(JSON.stringify(data, null, 2))}</pre>`);
    return { title, count: attrs.length };
  };

  on('chat:message', (msg) => {
    if (msg.type !== 'api' || !/^!t5e-dump\b/.test(msg.content)) return;
    if (!playerIsGM(msg.playerid)) return;

    const nameArg = msg.content.replace(/^!t5e-dump\s*/, '').trim();
    let characters = [];

    if (nameArg) {
      characters = findObjs({ _type: 'character', name: nameArg });
    } else {
      (msg.selected || []).forEach((sel) => {
        const token = getObj('graphic', sel._id);
        const character = token && getObj('character', token.get('represents'));
        if (character) characters.push(character);
      });
    }

    if (!characters.length) {
      sendChat('T5e', '/w gm No character found. Select a token linked to a character, or use: !t5e-dump Character Name');
      return;
    }

    characters.forEach((character) => {
      const result = dumpCharacter(character);
      sendChat('T5e', `/w gm Dumped ${result.count} attributes to the handout "${result.title}".`);
    });
  });
});
