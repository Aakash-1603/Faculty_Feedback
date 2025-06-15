// Initialize database with sample data
export const initializeDatabase = () => {
    // Check if database is already initialized
    if (localStorage.getItem('databaseInitialized')) {
      return;
    }
  
    // Sample students data
    const students = [
      {
        id: 1,
        name: 'Aakash Asthana',
        admissionNumber: 'S001',
        rollNumber: 'R001',
        year: '3',
        branch: 'IT',
        section: 'A'
      },
      {
        id: 2,
        name: 'Aviral Garg',
        admissionNumber: 'S002',
        rollNumber: 'R002',
        year: '3',
        branch: 'IT',
        section: 'A'
      },
      {
        id: 3,
        name: 'Aditya Singh',
        admissionNumber: 'S003',
        rollNumber: 'R003',
        year: '3',
        branch: 'IT',
        section: 'A'
      },
      {
        id: 4,
        name: 'Aryan Tripathy',
        admissionNumber: 'S004',
        rollNumber: 'R004',
        year: '3',
        branch: 'IT',
        section: 'A'
      },
      {
        id: 5,
        name: 'Arya Singh Gutam',
        admissionNumber: 'S005',
        rollNumber: 'R005',
        year: '3',
        branch: 'IT',
        section: 'A'
      }
    ];
  
    // Sample admins data
    const admins = [
      {
        id: 1,
        name: 'Admin User',
        username: 'admin',
        password: 'admin123'
      }
    ];
  
    // Sample teachers data
    const teachers = [
      {
        id: 1,
        name: 'Dr. Anshika Agarwal',
        image: '/api/placeholder/150/150',
        subjects: [
          { code: 'CS101', name: 'Operating System' }
        ],
        assignedClasses: [
          { year: '1', branch: 'CSE', section: 'A' },
          { year: '3', branch: 'IT', section: 'A' }
        ]
      },
      {
        id: 2,
        name: 'Prof. Nand kishore',
        image: '/api/placeholder/150/150',
        subjects: [
          { code: 'CS201', name: 'Data Structures' }
        ],
        assignedClasses: [
          { year: '2', branch: 'CSE', section: 'A' },
          { year: '2', branch: 'IT', section: 'B' },
          { year: '3', branch: 'IT', section: 'A' }
        ]
      },
      {
        id: 3,
        name: 'Dr. Rakesh Ranjan',
        image: '/api/placeholder/150/150',
        subjects: [
          { code: 'CS301', name: 'Computer Organizational Architecture' }
        ],
        assignedClasses: [
          { year: '1', branch: 'ECE', section: 'C' },
          { year: '2', branch: 'ECE', section: 'C' },
          { year: '3', branch: 'IT', section: 'A' }
        ]
      },
      {
        id: 4,
        name: 'Prof. Ayush Agarwal',
        image: '/api/placeholder/150/150',
        subjects: [
          { code: 'CS401', name: 'Database Management System' }
        ],
        assignedClasses: [
          { year: '3', branch: 'CSE', section: 'A' },
          { year: '3', branch: 'IT', section: 'B' },
          { year: '3', branch: 'IT', section: 'A' }
        ]
      },
      {
        id: 5,
        name: 'Dr. Monika Batra',
        image: '/api/placeholder/150/150',
        subjects: [
          { code: 'CS501', name: 'Therory of Automata' }
        ],
        assignedClasses: [
          { year: '4', branch: 'CSE', section: 'A' },
          { year: '3', branch: 'IT', section: 'A' }
        ]
      }
    ];
  
    // Sample feedbacks data
    const feedbacks = [
      {
        id: 1,
        studentId: 1,
        teacherId: 1,
        year: '1',
        branch: 'CSE',
        section: 'A',
        subjectCode: 'CS101',
        ratings: {
          teachingQuality: 4,
          contentClarity: 5,
          responsiveness: 4,
          preparedness: 5,
          overallExperience: 4
        },
        comments: 'Great teaching methods and very clear explanations.',
        date: '2025-04-20T10:30:00.000Z'
      },
      {
        id: 2,
        studentId: 2,
        teacherId: 2,
        year: '2',
        branch: 'IT',
        section: 'B',
        subjectCode: 'CS201',
        ratings: {
          teachingQuality: 5,
          contentClarity: 4,
          responsiveness: 5,
          preparedness: 5,
          overallExperience: 5
        },
        comments: 'Very knowledgeable and always willing to help students.',
        date: '2025-04-21T14:45:00.000Z'
      }
    ];
  
    // // Store data in localStorage
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('admins', JSON.stringify(admins));
    localStorage.setItem('teachers', JSON.stringify(teachers));
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    localStorage.setItem('databaseInitialized', 'true');
  };