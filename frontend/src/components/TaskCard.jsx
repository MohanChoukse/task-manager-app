import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { taskAPI } from '../services/api';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return 'bg-gray-100 text-gray-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case 'To Do':
        return 'In Progress';
      case 'In Progress':
        return 'Done';
      case 'Done':
        return 'To Do';
      default:
        return 'To Do';
    }
  };

  const handleStatusUpdate = async () => {
    const newStatus = getNextStatus(task.status);
    setLoading(true);
    
    try {
      await taskAPI.updateTaskStatus(task.id, newStatus);
      onUpdate(task.id, newStatus);
      toast.success('Task status updated!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    
    setLoading(true);
    try {
      await taskAPI.deleteTask(task.id);
      onDelete(task.id);
      toast.success('Task deleted successfully!');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-900 flex-1 mr-2">
          {task.title}
        </h3>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-red-500 hover:text-red-700 text-sm font-medium"
          title="Delete task"
        >
          ×
        </button>
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
        
        <button
          onClick={handleStatusUpdate}
          disabled={loading}
          className="btn btn-secondary text-xs"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
          ) : (
            'Next'
          )}
        </button>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default TaskCard; 