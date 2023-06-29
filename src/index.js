import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ShowSubjects from './subjects/ShowSubjects';
import ShowTeachers from './teachers/ShowTeachers';
import SubjectForm from './subjects/SubjectForm';
import SubjectDetails from './subjects/SubjectDetails';
import TeacherForm from "./teachers/TeacherForm";
import SubjectEdit from "./subjects/SubjectEdit";
import ProtectedRoute from './ProtectedRoute';
import ErrorDisplay from './ErrorDisplay';
import TeacherDetails from './teachers/TeacherDetails';
import TeacherEdit from './teachers/TeacherEdit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'subjects',
        element: <ProtectedRoute> <ShowSubjects /> </ProtectedRoute>,
        loader: async () => {
          return fetch('http://localhost:8080/api/v1/skolskidnevnik/subject');
        },
        errorElement: <ErrorDisplay entity="subject" />
      },
      {
        path: 'teachers',
        element: <ProtectedRoute> <ShowTeachers /> </ProtectedRoute>,
        loader: async () => {
          return fetch('http://localhost:8080/api/v1/skolskidnevnik/user/admin/teacher');
        },
      },
      {
        path: 'subjects/new_subjects',
        element: <SubjectForm />,
        loader: async () => {
          const teachers_r = await fetch('http://localhost:8080/api/v1/skolskidnevnik/user/admin/teacher')
          const teachers = await teachers_r.json();
          return teachers;
        }
      },
      {
        path: 'subjects/subject/:id',
        element: <SubjectDetails />,
        loader: async ({ params }) => {
          return fetch(`http://localhost:8080/api/v1/skolskidnevnik/subject/${params.id}`)
        }
      },
      {
        path: "subjects/edit_subject/:id",
        element: <SubjectEdit />,
        loader: async ({ params }) => {
          const subject_r = await fetch(`http://localhost:8080/api/v1/skolskidnevnik/subject/${params.id}`);
          const subject = await subject_r.json();
          return [subject];

        },
      },
      {
        path: "teachers/new_teacher",
        element: <TeacherForm />,
        loader: async () => {
          const subjects_r = await fetch('http://localhost:8080/api/v1/skolskidnevnik/subject')
          const subjects = await subjects_r.json();
          return subjects;
        }
      },
      {
        path: 'teachers/teacher/:id',
        element: <TeacherDetails />,
        loader: async ({ params }) => {
          return fetch(`http://localhost:8080/api/v1/skolskidnevnik/user/admin/teacher/${params.id}`)
        }
      },
      {
        path: "teachers/edit_teacher/:id",
        element: <TeacherEdit />,
        loader: async ({ params }) => {
          const teacher_r = await fetch(`http://localhost:8080/api/v1/skolskidnevnik/user/admin/teacher/${params.id}`);
          const teacher = await teacher_r.json();
          return [teacher];
        },
      }
    ]
  },

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
