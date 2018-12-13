'use strict';

const tooShort = (what, len, min, max) => `${what} is too short, please increase to at least ${min} characters (currently ${len})`;
const tooLong = (what, len, min, max) => `${what} is above maximum recommandation, please reduce to less than ${max} characters (currently ${len})`;
const isMissing = (what) => `${what} is missing`;

const warnMinMax = (warn,prop,what,min,max) => {
  if (!prop || !prop.length) {
    warn.push(isMissing(what));
  } else if (prop.length < min) {
    warn.push(tooShort(what, prop.length, min, max));
  } else if (prop.length > max) {
    warn.push(tooLong(what, prop.length, min, max));
  }
  return warn;
};


function ProjectWarningsService() {
  'ngInject';

  this.warnings = (project) => {

    if (!project || !project._rev) {
      return [];
    }
    const w = [];
    let what;
    let min=50;
    let max=500;

    try {

      if ('yes' === project.draft) {
        w.push("Draft");
      }

      if (project.end_date) {
        if ('planned' === project.state && new Date(project.end_date) < new Date()) {
          w.push("Planned project, but end date has passed");
        }
      }
      warnMinMax(w, project.summary, 'English summary for non-experts', min, max);

      what = 'Norwegian summary for non-experts';
      if (project.translations && project.translations.nb && project.translations.nb.summary && project.translations.nb.summary.length) {
        warnMinMax(w, project.translations.nb.summary, what, min, max);
      } else {
        warn.push(isMissing(what));
      }

      if (!project.organisations || project.organisations.length < 1) {
        w.push("Project is not affiliated with any organisation");
      }
      if (!project.people || project.people.length < 1) {
        w.push("There are no people affiliated with this project");
      }
    } catch (e) {
      console.error(e);
    }
    return w;
  };
}
module.exports = ProjectWarningsService;
