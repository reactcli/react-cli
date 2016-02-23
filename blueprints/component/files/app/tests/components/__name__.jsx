'use strict';

var React = require('react'),
    TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    __name__ = require('../../components/__name__').default;

describe('__name__', function() {
  describe('#render()', function() {
    it('should succeed', function() {
      let component = TestUtils.renderIntoDocument(
        <__name__ />
      );

      expect(component).to.not.be.undefined;
    });
  });
});