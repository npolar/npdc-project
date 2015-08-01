
README

These scripts are for moving couchdb documents through a new schema transformation.
Afterwards, update api schema transformation.

Fields to remove:
edits
related_projects
research_programs
results_datasets

The three last fields should merged into the "links" array. As of today only research_programs have be used actively.

Execute:
ruby migration.rb
