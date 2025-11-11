
// Paste your full Team Task Dashboard React code here
import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Trash2, Edit2, CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'team_task_dashboard_v1';
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const STATUSES = ['Todo', 'In Progress', 'Waiting', 'Done'];
const uid = () => Math.random().toString(36).slice(2, 9);
const now = () => new Date().toISOString();

export default function TeamTaskDashboard() {
  const [tasks, setTasks] = useState(() => loadTasks());
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => saveTasks(tasks), [tasks]);

  function upsertTask(payload) {
    if (!payload.title) return;
    if (!payload.id) {
      const t = { id: uid(), createdAt: now(), updatedAt: now(), ...payload };
      setTasks((s) => [t, ...s]);
    } else {
      setTasks((s) => s.map((x) => (x.id === payload.id ? { ...x, ...payload, updatedAt: now() } : x)));
    }
    setShowForm(false);
    setEditing(null);
  }

  function removeTask(id) {
    if (!confirm('Delete this task?')) return;
    setTasks((s) => s.filter((t) => t.id !== id));
  }

  function toggleDone(id) {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, status: t.status === 'Done' ? 'Todo' : 'Done', updatedAt: now() } : t)));
  }

  return <div>Dashboard placeholder - paste full code here</div>;
}

function loadTasks() { return []; }
function saveTasks(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
