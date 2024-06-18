/**
 * @jest-environment jsdom
 */

'use strict';

const formjson = require('../formjson.js');

test('End to end from form to JSON', () => {
    document.body.innerHTML = `
    <form id="testForm">
        <input type="text" name="name" value="testname">
        <input type="text" name="address.street" value="test street">
        <input type="text" name="address.city" value="test city">
        <input type="text" name="address.zip" value="12345">
        <input type="text" name="tags[0]" value="tag1">
        <input type="text" name="tags[1]" value="tag2">
        <input type="text" name="multipleChoice[0]" value="choice1">
        <input type="text" name="multipleChoice[1]" value="choice2">
        <input type="text" name="administrators[0].name" value="admin1">
        <input type="email" name="administrators[0].email" value="admin1@example.com">
        <input type="text" name="administrators[1].name" value="admin2">
        <input type="email" name="administrators[1].email" value="admin2@example.com">
        <input type="text" name="administrators[2].name" value="admin3">
        <input type="email" name="administrators[2].email" value="admin3@example.com">
        <input type="text" name="owner.settings[0].name" value="setting1">
        <input type="text" name="owner.settings[0].value__existing" value="value1existing">
        <input type="text" name="owner.settings[0].value" value="value1">
        <input type="text" name="owner.settings[1].name" value="setting2">
        <input type="text" name="owner.settings[1].value__existing" value="value2">
        <button type="submit">Submit</button>
    </form>
  `;

    const form = document.getElementById('testForm');
    const formData = formjson.formDataToList(form);

    expect(formData).toEqual({
        'name': 'testname',
        'address.street': 'test street',
        'address.city': 'test city',
        'address.zip': '12345',
        'tags[0]': 'tag1',
        'tags[1]': 'tag2',
        'multipleChoice[0]': 'choice1',
        'multipleChoice[1]': 'choice2',
        'administrators[0].name': 'admin1',
        'administrators[0].email': 'admin1@example.com',
        'administrators[1].name': 'admin2',
        'administrators[1].email': 'admin2@example.com',
        'administrators[2].name': 'admin3',
        'administrators[2].email': 'admin3@example.com',
        'owner.settings[0].name': 'setting1',
        'owner.settings[0].value': 'value1',
        'owner.settings[1].name': 'setting2',
        'owner.settings[1].value': 'value2'
    });

    const json = formjson.convertToObjectHierarchy(formData);

    expect(json.name).toEqual('testname');
    expect(json.address.street).toEqual('test street');
    expect(json.address.city).toEqual('test city');
    expect(json.address.zip).toEqual('12345');
    expect(json.tags[0]).toEqual('tag1');
    expect(json.tags[1]).toEqual('tag2');
    expect(json.administrators[0].name).toEqual('admin1');
    expect(json.administrators[0].email).toEqual('admin1@example.com');
    expect(json.administrators[1].name).toEqual('admin2');
    expect(json.administrators[1].email).toEqual('admin2@example.com');
    expect(json.administrators[2].name).toEqual('admin3');
    expect(json.administrators[2].email).toEqual('admin3@example.com');
    expect(json.owner.settings[0].name).toEqual('setting1');
    expect(json.owner.settings[0].value).toEqual('value1');
    expect(json.owner.settings[1].name).toEqual('setting2');
    expect(json.owner.settings[1].value).toEqual('value2');
    expect(json.multipleChoice).toEqual(['choice1', 'choice2']);
});

test('Direct method test', () => {
    document.body.innerHTML = `
    <form id="testForm">
        <input type="text" name="address.street" value="test street">
        <input type="text" name="address.city" value="test city">
    </form>
  `;

    const form = document.getElementById('testForm');
    const json = formjson.form_to_object(form);

    expect(json.address.street).toEqual('test street');
    expect(json.address.city).toEqual('test city');
});