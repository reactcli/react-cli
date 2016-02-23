'use strict';

var React = require('react'),
    TestUtils = require('react-addons-test-utils'),
    expect = require('chai').expect,
    App = require('../../components/App').default;

describe('App', function() {
  describe('#render()', function() {
    it('should succeed', function() {
      let component = TestUtils.renderIntoDocument(
        <App />
      );

      expect(component).to.not.be.undefined;
    });
  });
});