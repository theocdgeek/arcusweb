/**
 * Copyright 2019 Arcus Project
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import $ from 'jquery';
import fixture from 'can-fixture/';
import assert from 'chai';
import canMap from 'can-map';
import Account from 'i2web/models/account';
import Place from 'i2web/models/place';
import loginAndRender from 'i2web/test/util/loginAndRender';
import './billing-address';


let cleanupAfterRender;
let scope;
const template = `
  <arcus-create-account-billing-address {^has-changes}="isSatisfied" {^@form-validates}="isValidForm"
    {account}="account"
    {card-number}="cardNumber"
    {cvv}="securityCode"
    {exp-month}="expMonth"
    {exp-year}="expYear"
    {place}="place"
  />
`;

const ViewModel = canMap.extend({
  isSatisfied: false,
  account: new Account({
    'account:billingCCLast4': '',
    'account:billingCCType': '',
    'account:billingCity': '',
    'account:billingLastName': 'Stahl',
    'account:billingState': '',
    'account:billingZip': '',
    'account:owner': '96fc8c89-5ee1-4c0a-8158-56fe4036b0bd',
    'base:address': 'SERV:account:e54d2ce2-17a2-47a2-a377-e25ac9eb7902',
    'base:caps': [
      'account',
      'base',
    ],
    'base:id': 'e54d2ce2-17a2-47a2-a377-e25ac9eb7902',
    'base:tags': [],
    'base:type': 'account',
  }),
  place: new Place({
    'base:caps': [
      'place',
      'base',
    ],
    'place:streetAddress1': '1134 Pinetree Lane',
    'place:streetAddress2': '',
    'place:name': 'HQ',
    'place:tzId': 'US/Central',
    'place:tzName': 'Central',
    'base:id': '3d496bfc-1098-493e-afd4-7f56c12dbef6',
    'base:address': 'SERV:place:3d496bfc-1098-493e-afd4-7f56c12dbef6',
    'place:tzUsesDST': true,
    'place:country': 'US',
    'place:serviceLevel': 'PREMIUM',
    'place:account': 'e54d2ce2-17a2-47a2-a377-e25ac9eb7902',
    'base:tags': [],
    'place:addrGeoPrecision': 'UNKNOWN',
    'place:lastServiceLevelChange': 1469812445788,
    'place:addrValidated': false,
    'place:addrLongitude': -87.9732,
    'place:city': 'Libertyville',
    'place:tzOffset': -6.0,
    'place:addrLatitude': 42.27973,
    'base:type': 'place',
    'place:serviceAddons': [],
    'base:images': {},
    'place:state': 'IL',
    'place:zipCode': '60048',
  }),
});

describe('i2web/components/create-account/billing-address', function favorite() {
  before(function before() {
    fixture.reset();
  });

  beforeEach(function beforeEach(done) {
    scope = new ViewModel();
    loginAndRender({
      renderTo: '#test-area',
      template,
      scope,
      appScope: {
      },
    }).then(({ cleanup }) => {
      cleanupAfterRender = cleanup;
      done();
    }).catch(() => {
      console.error(arguments);
      done();
    });
  });

  afterEach(function after(done) {
    cleanupAfterRender().then(() => {
      done();
    }).catch(() => {
      console.error(arguments);
      done();
    });
  });

  describe('rendering', function rendering() {
    it('shall be rendered on the page', function isRendered() {
      assert.isAtLeast($('arcus-create-account-billing-address').children().length, 1, 'arcus-create-account-billing-address is rendered');
    });
  });
});
