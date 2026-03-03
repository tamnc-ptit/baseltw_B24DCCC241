
export interface Subject {
  id: string;
  name: string;
}
export interface Schedule {
  id: string;
  subjectId: string;
  dateTime: string;   // ISO string
  duration: number;   // phút
  content: string;
  note: string;
}
export interface Goal {
	id: string;
	subjectId: string | null;
	month: string; // ví dụ: "2026-03"
	targetMinutes: number;
}


function getData<T>(key: string): T[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
function saveData<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

// Subjects
export function getSubjects(): Subject[] {
  return getData<Subject>("subjects");
}

export function addSubject(name: string): Subject[] {
  const subjects = getSubjects();

  const newSubject: Subject = {
    id: "sub" + Date.now(),
    name,
  };

  subjects.push(newSubject);
  saveData("subjects", subjects);

  return subjects;
}

export function deleteSubject(id: string): Subject[] {
  const updated = getSubjects().filter((s) => s.id !== id);
  saveData("subjects", updated);
  return updated;
}

export function updateSubject(
  id: string,
  newName: string
): Subject[] {
  const updated = getSubjects().map((s) =>
    s.id === id ? { ...s, name: newName } : s
  );

  saveData("subjects", updated);
  return updated;
}





// Schedules
export function getSchedules(): Schedule[] {
  return getData<Schedule>("schedules");
}

export function addSchedule(schedule: Omit<Schedule, "id">): Schedule[] {
  const schedules = getSchedules();

  const newSchedule: Schedule = {
    id: "sch" + Date.now(),
    ...schedule,
  };

  schedules.push(newSchedule);
  saveData("schedules", schedules);

  return schedules;
}

export function deleteSchedule(id: string): Schedule[] {
  const updated = getSchedules().filter((s) => s.id !== id);
  saveData("schedules", updated);
  return updated;
}

export function updateSchedule(
  id: string,
  updatedData: Omit<Schedule, "id">
): Schedule[] {
  const updated = getSchedules().map((s) =>
    s.id === id ? { id, ...updatedData } : s
  );

  saveData("schedules", updated);
  return updated;
}




export const getGoals = (): Goal[] => {
	return JSON.parse(localStorage.getItem("goals") || "[]");
};

export const saveGoals = (goals: Goal[]) => {
	localStorage.setItem("goals", JSON.stringify(goals));
};

export const addGoal = (goal: Omit<Goal, "id">) => {
	const goals = getGoals();
	const newGoal = { id: Date.now().toString(), ...goal };
	const updated = [...goals, newGoal];
	saveGoals(updated);
	return updated;
};