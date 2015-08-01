exports.conf = {
    "tasks": {
        "find-researh-programs-documents": function (c, doc) {
            if (typeof(doc.research_programs) != 'undefined') {
                console.log(doc._id);
            }
        }
    }
}
