'use strict'

const inspect = require('inspect.js')
const sinon = require('sinon')
inspect.useSinon(sinon)

const SupershitConfig = require('../../../src/core/SupershitConfig')

describe('SupershitConfig', () => {
  describe('class', () => {
    it('should be a class', () => {
      inspect(SupershitConfig).isClass()
    })
  })

  describe('load', () => {
    it('has a load method', () => {
      const conf = new SupershitConfig()
      inspect(conf).hasMethod('load')
    })

    it('loads a json config', () => {
      const conf = new SupershitConfig()
      conf.load('tests/fixtures/config/json')
      inspect(conf.__config).hasProps({
        foo: 'bla',
        bar: 'blub',
        log: {
          level: 'error'
        }
      })
    })

    it('loads a cson config', () => {
      const conf = new SupershitConfig()
      conf.load('tests/fixtures/config/cson')
      inspect(conf.__config).hasProps({
        foo: 'bla',
        bar: 'blub',
        log: {
          level: 'error'
        }
      })
    })

    it('loads a yml config', () => {
      const conf = new SupershitConfig()
      conf.load('tests/fixtures/config/yaml')
      inspect(conf.__config).hasProps({
        foo: 'bla',
        bar: 'blub',
        log: {
          level: 'error'
        }
      })
    })

    it('loads a json config, keeps custom conf', () => {
      const conf = new SupershitConfig({
        log: {
          level: 'warn'
        }
      })

      conf.load('tests/fixtures/config/json')
      inspect(conf.__config).hasProps({
        foo: 'bla',
        bar: 'blub',
        log: {
          level: 'warn'
        }
      })
    })

    it('loads a cson config, keeps custom conf', () => {
      const conf = new SupershitConfig({
        log: {
          level: 'warn'
        }
      })

      conf.load('tests/fixtures/config/cson')
      inspect(conf.__config).hasProps({
        foo: 'bla',
        bar: 'blub',
        log: {
          level: 'warn'
        }
      })
    })

    it('loads a yml config, keeps custom conf', () => {
      const conf = new SupershitConfig({
        log: {
          level: 'warn'
        }
      })

      conf.load('tests/fixtures/config/yaml')
      inspect(conf.__config).hasProps({
        foo: 'bla',
        bar: 'blub',
        log: {
          level: 'warn'
        }
      })
    })
  })

  describe('Config object', () => {
    it('returns a configuration object', () => {
      const conf = new SupershitConfig()

      inspect(conf.__config).hasProps({
        server: {
          port: 7448
        }
      })
    })

    it('overwrites config parameters', () => {
      const conf = new SupershitConfig({
        server: {
          port: 1234
        }
      })

      inspect(conf.__config).hasProps({
        server: {
          port: 1234
        }
      })
    })

    it('extends config parameters', () => {
      const conf = new SupershitConfig({
        server: {
          host: 'http://test.io'
        }
      })

      inspect(conf.__config).hasProps({
        server: {
          port: 7448,
          host: 'http://test.io'
        }
      })
    })
  })
})
