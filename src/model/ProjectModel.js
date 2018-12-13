'use strict';
function ProjectModel(NpdcAPA) {
  'ngInject';

  let self = this;

  this.risProjectUri = (id) => {
    return `https://www.researchinsvalbard.no/search/result/project?q=${id}&collection=project`;
  };

  this.acronym_title = (p, sep=': ') => {
    if (!p) { return; }
    return `${ p.acronym ? p.acronym+sep : '' }${p.title}`;
  };

  this.range = (p) => {
    let range = [];
    if (p.start_date) {
      range[0] = p.start_date.split('T')[0];
    }
    if (p.end_date) {
      range[1] = p.end_date.split('T')[0];
    }
    return range;
   };

  this.people_with_role = (p, role='projectLeader') => {
    if (!p) {
      return;
    }
    return (p.people||[]).filter(p => p.role === role);
  };

  this.led_by = (p) => {
    return NpdcAPA.apa_style_list( self.people_with_role(p, 'projectLeader').map(p => `${p.first_name} ${p.last_name}`) );
  };
}
module.exports = ProjectModel;
