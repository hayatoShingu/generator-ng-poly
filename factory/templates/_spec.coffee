###global describe, beforeEach, it, expect, inject, module###
'use strict'

describe '<%= upperCamel %>', ->
  factory = undefined

  beforeEach module '<% if (parentModuleName) { %><%= parentModuleName %>.<% } %><%= moduleName %>'

  beforeEach inject (<%= upperCamel %>) ->
    factory = <%= upperCamel %>

  it 'should have someValue be <%= upperCamel %>', ->
    expect(factory.someValue).toEqual '<%= upperCamel %>'

  it 'should have someMethod return <%= upperCamel %>', ->
    expect(factory.someMethod()).toEqual '<%= upperCamel %>'