const fs = require('fs')

class MatchesController {
    
    static getAllStudents(req, res) {
          return res.status(200).json({
                students,
                message: "All the students",
          });
    }

    static sendResponseByFilter(dbPath, req, res) {
        fs.readFile(dbPath, 'utf8', function(err, contents) {
            if(!err) {
                res.send(JSON.parse(contents))
            } else {
                res.send(err)
            }
        });
    }

    // Get a single student
    static getSingleStudent(req, res) {
           const findStudent = students.find(student => student.id === parseInt(req.params.id, 10));
           if (findStudent) {
               return res.status(200).json({
                     student: findStudent,
                     message: "A single student record",
               });
           }
           return res.status(404).json({
                 message: "Student record not found",
           });
    }
}

module.exports = MatchesController