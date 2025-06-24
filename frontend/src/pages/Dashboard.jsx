// import { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast';
// import { taskAPI } from '../services/api';
// import TaskCard from '../components/TaskCard';

// const Dashboard = ({ user, onLogout }) => {
//   const [tasks, setTasks] = useState({
//     'To Do': [],
//     'In Progress': [],
//     'Done': []
//   });
//   const [newTaskTitle, setNewTaskTitle] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [creatingTask, setCreatingTask] = useState(false);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const response = await taskAPI.getTasks();
//       setTasks(response.data.data);
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to fetch tasks';
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateTask = async (e) => {
//     e.preventDefault();
    
//     if (!newTaskTitle.trim()) {
//       toast.error('Please enter a task title');
//       return;
//     }

//     setCreatingTask(true);
//     try {
//       const response = await taskAPI.createTask({ title: newTaskTitle.trim() });
//       const newTask = response.data.data;
      
//       setTasks(prev => ({
//         ...prev,
//         'To Do': [newTask, ...prev['To Do']]
//       }));
      
//       setNewTaskTitle('');
//       toast.success('Task created successfully!');
//     } catch (error) {
//       const message = error.response?.data?.message || 'Failed to create task';
//       toast.error(message);
//     } finally {
//       setCreatingTask(false);
//     }
//   };

//   const handleUpdateTask = (taskId, newStatus) => {
//     setTasks(prev => {
//       const updatedTasks = { ...prev };
      
//       // Remove task from current status
//       Object.keys(updatedTasks).forEach(status => {
//         updatedTasks[status] = updatedTasks[status].filter(task => task.id !== taskId);
//       });
      
//       // Add task to new status
//       const taskToUpdate = [...prev['To Do'], ...prev['In Progress'], ...prev['Done']]
//         .find(task => task.id === taskId);
      
//       if (taskToUpdate) {
//         taskToUpdate.status = newStatus;
//         updatedTasks[newStatus] = [taskToUpdate, ...updatedTasks[newStatus]];
//       }
      
//       return updatedTasks;
//     });
//   };

//   const handleDeleteTask = (taskId) => {
//     setTasks(prev => {
//       const updatedTasks = { ...prev };
//       Object.keys(updatedTasks).forEach(status => {
//         updatedTasks[status] = updatedTasks[status].filter(task => task.id !== taskId);
//       });
//       return updatedTasks;
//     });
//   };

//   const getColumnColor = (status) => {
//     switch (status) {
//       case 'To Do':
//         return 'border-gray-200 bg-gray-50';
//       case 'In Progress':
//         return 'border-blue-200 bg-blue-50';
//       case 'Done':
//         return 'border-green-200 bg-green-50';
//       default:
//         return 'border-gray-200 bg-gray-50';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
//               <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
//             </div>
//             <button
//               onClick={onLogout}
//               className="btn btn-secondary"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Create Task Form */}
//         <div className="mb-8">
//           <form onSubmit={handleCreateTask} className="flex gap-4">
//             <input
//               type="text"
//               value={newTaskTitle}
//               onChange={(e) => setNewTaskTitle(e.target.value)}
//               placeholder="Enter a new task..."
//               className="input flex-1"
//               disabled={creatingTask}
//             />
//             <button
//               type="submit"
//               disabled={creatingTask || !newTaskTitle.trim()}
//               className="btn btn-primary"
//             >
//               {creatingTask ? (
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//               ) : (
//                 'Add Task'
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Task Columns */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {Object.entries(tasks).map(([status, taskList]) => (
//             <div
//               key={status}
//               className={`rounded-lg border-2 ${getColumnColor(status)} p-4`}
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h2 className="text-lg font-semibold text-gray-900">{status}</h2>
//                 <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
//                   {taskList.length}
//                 </span>
//               </div>
              
//               <div className="space-y-3">
//                 {taskList.length === 0 ? (
//                   <div className="text-center py-8 text-gray-500">
//                     No tasks in {status}
//                   </div>
//                 ) : (
//                   taskList.map(task => (
//                     <TaskCard
//                       key={task.id}
//                       task={task}
//                       onUpdate={handleUpdateTask}
//                       onDelete={handleDeleteTask}
//                     />
//                   ))
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard; 


import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { taskAPI } from '../services/api';
import TaskCard from '../components/TaskCard';

const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState({ 'To Do': [], 'In Progress': [], 'Done': [] });
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [creatingTask, setCreatingTask] = useState(false);

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return toast.error('Please enter a task title');
    setCreatingTask(true);
    try {
      const response = await taskAPI.createTask({ title: newTaskTitle.trim() });
      const newTask = response.data.data;
      setTasks(prev => ({ ...prev, 'To Do': [newTask, ...prev['To Do']] }));
      setNewTaskTitle('');
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    } finally {
      setCreatingTask(false);
    }
  };

  const handleUpdateTask = (taskId, newStatus) => {
    setTasks(prev => {
      const updatedTasks = { ...prev };
      Object.keys(updatedTasks).forEach(status => {
        updatedTasks[status] = updatedTasks[status].filter(task => task.id !== taskId);
      });
      const taskToUpdate = [...prev['To Do'], ...prev['In Progress'], ...prev['Done']].find(task => task.id === taskId);
      if (taskToUpdate) {
        taskToUpdate.status = newStatus;
        updatedTasks[newStatus] = [taskToUpdate, ...updatedTasks[newStatus]];
      }
      return updatedTasks;
    });
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => {
      const updatedTasks = { ...prev };
      Object.keys(updatedTasks).forEach(status => {
        updatedTasks[status] = updatedTasks[status].filter(task => task.id !== taskId);
      });
      return updatedTasks;
    });
  };

  const getColumnColor = (status) => {
    switch (status) {
      case 'To Do': return 'bg-white border-l-4 border-indigo-400';
      case 'In Progress': return 'bg-white border-l-4 border-yellow-400';
      case 'Done': return 'bg-white border-l-4 border-green-400';
      default: return 'bg-white border-l-4 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <header className="sticky top-0 bg-white shadow z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-indigo-800">Task Manager</h1>
            <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
          </div>
          <button onClick={onLogout} className="bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 font-medium">Logout</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <form onSubmit={handleCreateTask} className="flex gap-4 mb-10">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What's your next task?"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring focus:outline-none"
            disabled={creatingTask}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
            disabled={creatingTask || !newTaskTitle.trim()}
          >
            {creatingTask ? <div className="animate-spin h-5 w-5 border-b-2 border-white rounded-full mx-auto" /> : 'Add Task'}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(tasks).map(([status, taskList]) => (
            <div key={status} className={`rounded-xl shadow-sm p-4 ${getColumnColor(status)}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{taskList.length}</span>
              </div>
              <div className="space-y-3">
                {taskList.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 italic">No tasks</div>
                ) : (
                  taskList.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
