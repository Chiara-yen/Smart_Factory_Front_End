'use strict';

var $ = window.jQuery = require('jquery');
var header = require('../includes/header');
var api = require('../machine/api');
var template = require('../machine/templates/index-list-template');
var factoryDropdown = require('../lib/component/dropdown-factory');

/* DOM */
var $machineNewBtn    = $('#machine-new-button');
var $machineTable     = $('#machine-table');
var $machineTableBody = $('#machine-table-body');

initialize();

function initialize() {
	header.include();
	bindEvents();
}

function bindEvents() {
	factoryDropdown.emitter.on('factoryChanged', getInitialData);
	$machineNewBtn.on('click', gotoMachineNewInfoPage);
	$machineTable.on('click', '.detail-info-button', gotoMachineDetailInfoPage);
}

function getInitialData() {
	var ID = getFactoryId();
	console.log('FactoryId : ' + ID);
	api.setFactoryId(ID);
	api.getMachineList()
		 .done(initialView)
		 .fail(function(err) { console.log("GET Machine List error: ", err); });
}

function gotoMachineNewInfoPage() {
	api.goToMachineInfo('new', {factoryId: getFactoryId()});
}

function gotoMachineDetailInfoPage() {
	var ID = $(this).data('id');
	api.goToMachineInfo('detail', {factoryId: getFactoryId(), ID: ID});
}

function getFactoryId() {
	return factoryDropdown.getSelectedFactoryId();
}

function initialView(array) {
	var tableListRows = template.render({ infos : array});
	$machineTableBody.empty().append( tableListRows );
}