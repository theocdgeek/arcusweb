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

import _ from 'lodash';
import routerUtils from '../../util';
import deviceData from 'i2web/models/fixtures/data/device';
import dashboardEntries from 'i2web/models/fixtures/data/place/dashboard-entries.json';
import hubData from 'i2web/models/fixtures/data/place/hub.json';
import personData from 'i2web/models/fixtures/data/person.json';

export default {
  'place:ListDevices': function placeListDevices(params) {
    return {
      messageType: 'place:ListDevicesResponse',
      attributes: {
        devices: _.filter(deviceData, ['dev:place', params.id]),
      },
    };
  },
  'place:GetHub': function placeGetHub() {
    return {
      messageType: 'place:GetHubResponse',
      attributes: {
        hub: hubData,
      },
    };
  },
  'place:ListPersons': function placeListPersons() {
    return {
      messageType: 'place:ListPersonsResponse',
      attributes: {
        persons: personData,
      },
    };
  },
  'place:ListDashboardEntries': function placeListDashboardEntries(params) {
    const token = params.token || null;
    const limit = params.limit || 10;
    const rawEvents = dashboardEntries[params.id] || [];
    let startIndex = 0;
    let haveEvents = false;
    let events = [];
    let i;
    let nextToken;

    // If there is a token, find what event will be first in the response
    // If the token is too old, we have no events
    if (token) {
      for (i = 0; i < rawEvents.length; i++) {
        if (rawEvents[i].timestamp <= token) {
          startIndex = i;
          haveEvents = true;
          break;
        }
      }
    } else if (rawEvents.length > 0) {
      haveEvents = true;
    }

    if (haveEvents) {
      // nextToken is the timestamp of the next event in the list
      if (rawEvents.length > startIndex + limit) {
        nextToken = rawEvents[startIndex + limit + 1].timestamp;
      } else {
        // If there are no more events, null is returned
        nextToken = null;
      }

      events = rawEvents.slice(startIndex, limit);
    }
    return {
      messageType: 'place:ListDashboardEntriesResponse',
      attributes: {
        results: events,
        nextToken,
      },
    };
  },
  'place:ListHistoryEntries': function placeListHistoryEntries(params) {
    // TODO mock
    return routerUtils.notImplemented(params);
  },
};
