'use strict';

var _ = require('lodash');

exports = module.exports = {};

exports.render = function(infos) {

  var menuTemp = _.template(
	 `<% _.forEach(infos, function(info) {  %>
      <li class="table-item">
          <div class="table-col"><%= info.serial_num %></div>
          <div class="table-col"><%= info.name %></div>
          <div class="table-col"><%= info.weight %></div>
          <div class="table-col"><%= info.availability_rate %>%</div>
          <div class="table-col">
              <button class="detail-info-button" data-id="<%= info.id %>">詳細資訊</button>
          </div>
      </li>
    <% }); %>`
	);

  return menuTemp(infos);
}