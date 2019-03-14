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

import Bridge from 'i2web/cornea/bridge';

/**
 * @module {Object} i2web/models/HubNetwork HubNetwork
 * @parent app.models.capabilities
 */
export default {
  writeableAttributes: [],
  methods: {
    /**
     * @function GetRoutingTable
     *
     * Gets the routing table for the active netowrk interface.
     *
     * @return {Promise}
     */
    GetRoutingTable() {
      return Bridge.request('hubnet:GetRoutingTable', this.GetDestination(), {});
    },
  },
  events: {},
  TYPE_ETH: 'ETH',
  TYPE_3G: '3G',
  TYPE_WIFI: 'WIFI',
};
