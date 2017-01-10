'use strict';
// @todo @issue Dynamic filter faceting does not work unless filter fields are added to facets parameter!
// @todo @issue Facet counts are not updated when chips are removed... unless reload on sarch is set to false (see routes)

var ProjectSearchController = function ($scope, $location, $controller, Project, ProjectModel, npdcAppConfig) {
  'ngInject';

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Project;

  npdcAppConfig.search.local.results.detail = (p) => {
    let range = ProjectModel.range(p);
    if (range.length === 2) {
      return `${range[0]} to ${range[1]}`;
    } else if (range.length === 1) {
      return range[0];
    } else {
      return '';
    }
  }
  npdcAppConfig.search.local.results.title = ProjectModel.acronym_title;
  npdcAppConfig.search.local.results.subtitle = 'state';

  /* npdcAppConfig.search.local.filterUi = {
    'updated': {
      type: 'hidden'
    }
  };*/

  let param = $location.search();
  let defaults = { limit: param.limit || 20,
    fields: 'id,title,acronym,start_date,end_date,type,topics,state,created,created_by,updated,updated_by,people',
    facets:'state,topics,type,website,people.email,created,updated,created_by,updated_by'
  };


  // If no search => show latest
  if (!$location.search().q || $location.search().q==='') {
    // FIXME: sorting sticks to search
    defaults['sort'] = '-start_date,-updated';
    // If also no state filter => show only ongoing
    if (! (/[?&]filter[-]/).test( JSON.stringify( $location.search() ) ) ) {
      $location.search({'filter-state': 'ongoing'}); // FIXME Faceting does not handle 'filter-end_date': '1900-01-01T00:00:00Z..${year+1}-01-01T00:00:00Z'
      npdcAppConfig.search.local.results.subtitle = 'type';
    }
  }
  let query = Object.assign( {}, defaults);

  let search = function (q) {
    npdcAppConfig.search.local.results.subtitle = 'type';
    $scope.search(Object.assign({}, query, q));
  };

  search(query);

  $scope.$on('$locationChangeSuccess', (event, data) => {
    search();
  });

};

module.exports = ProjectSearchController;