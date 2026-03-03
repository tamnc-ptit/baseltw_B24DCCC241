import React, { useEffect, useState } from 'react';
import { Input, Button, Space } from 'antd';
import {
	getSubjects,
	addSubject,
	deleteSubject,
	updateSubject,
	Subject,
	getSchedules,
	addSchedule,
	deleteSchedule,
	updateSchedule,
	Schedule,
    getGoals,
    addGoal,
    Goal
} from './app';
const BaiTap2: React.FC = () => {
	const [subjects, setSubjects] = useState<Subject[]>([]);
	const [name, setName] = useState<string>('');
	const [editingId, setEditingId] = useState<string | null>(null);
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
	const [dateTime, setDateTime] = useState<string>('');
	const [duration, setDuration] = useState<number>(0);
	const [content, setContent] = useState<string>('');
	const [note, setNote] = useState<string>('');
	const [editingScheduleId, setEditingScheduleId] = useState<string | null>(null);
	const [goals, setGoals] = useState<Goal[]>([]);
	const [goalMonth, setGoalMonth] = useState<string>('');
	const [goalMinutes, setGoalMinutes] = useState<number>(0);
	const [goalSubjectId, setGoalSubjectId] = useState<string>('');
	// Load dữ liệu khi component mount
	useEffect(() => {
		setSubjects(getSubjects());
		setSchedules(getSchedules());
		setGoals(getGoals());
	}, []);
	//Subjects
	const handleAddSubject = () => {
		if (!name.trim()) return;

		const updated = addSubject(name);
		setSubjects(updated);
		setName('');
	};
	const handleUpdateSubject = () => {
		if (!editingId || !name.trim()) return;

		const updated = updateSubject(editingId, name);
		setSubjects(updated);

		setEditingId(null);
		setName('');
	};
	const handleDeleteSubject = (id: string) => {
		const updated = deleteSubject(id);
		setSubjects(updated);
	};

	//Schedules
	const handleAddSchedule = () => {
		if (!selectedSubjectId || !dateTime) return;

		const updated = addSchedule({
			subjectId: selectedSubjectId,
			dateTime,
			duration,
			content,
			note,
		});
		console.log(updated);
		setSchedules(updated);

		// reset form
		setSelectedSubjectId('');
		setDateTime('');
		setDuration(0);
		setContent('');
		setNote('');
	};
	const handleUpdateSchedule = () => {
		if (!editingScheduleId) return;

		const updated = updateSchedule(editingScheduleId, {
			subjectId: selectedSubjectId,
			dateTime,
			duration,
			content,
			note,
		});

		setSchedules(updated);

		// reset
		setEditingScheduleId(null);
		setSelectedSubjectId('');
		setDateTime('');
		setDuration(0);
		setContent('');
		setNote('');
	};

	const calculateMinutes = (month: string, subjectId: string | null) => {
		return schedules
			.filter((sch) => {
				const scheduleMonth = sch.dateTime.slice(0, 7);
				return scheduleMonth === month && (subjectId ? sch.subjectId === subjectId : true);
			})
			.reduce((total, sch) => total + sch.duration, 0);
	};

	return (
		<div style={{ padding: 20 }}>
			<h2>Quản lý môn học</h2>

			<Space>
				<Input placeholder='Nhập tên môn học' value={name} onChange={(e) => setName(e.target.value)} />

				<Button type='primary' onClick={editingId ? handleUpdateSubject : handleAddSubject}>
					{editingId ? 'Cập nhật' : 'Thêm'}
				</Button>
			</Space>

			<div style={{ marginTop: 20 }}>
				{subjects.map((sub) => (
					<div
						key={sub.id}
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							marginBottom: 8,
							border: '1px solid #ddd',
							padding: 8,
							borderRadius: 6,
						}}
					>
						<span>{sub.name}</span>
						<Button
							onClick={() => {
								setEditingId(sub.id);
								setName(sub.name);
							}}
						>
							Sửa
						</Button>
						<Button danger onClick={() => handleDeleteSubject(sub.id)}>
							Xóa
						</Button>
					</div>
				))}
			</div>

			<div>
				<select value={selectedSubjectId} onChange={(e) => setSelectedSubjectId(e.target.value)}>
					<option value=''>Chọn môn</option>
					{subjects.map((sub) => (
						<option key={sub.id} value={sub.id}>
							{sub.name}
						</option>
					))}
				</select>

				<Input type='datetime-local' value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
				<Input
					type='number'
					placeholder='Thời lượng (phút)'
					value={duration}
					onChange={(e) => setDuration(Number(e.target.value))}
				/>
				<Input placeholder='Nội dung' value={content} onChange={(e) => setContent(e.target.value)} />
				<Input placeholder='Ghi chú' value={note} onChange={(e) => setNote(e.target.value)} />
				<Button type='primary' onClick={editingScheduleId ? handleUpdateSchedule : handleAddSchedule}>
					{editingScheduleId ? 'Cập nhật lịch' : 'Thêm lịch học'}
				</Button>
			</div>
			{selectedSubjectId && (
				<div style={{ marginTop: 30 }}>
					<h3>Lịch học của môn đã chọn</h3>

					{schedules
						.filter((sch) => sch.subjectId === selectedSubjectId)
						.map((sch) => (
							<div
								key={sch.id}
								style={{
									border: '1px solid #ccc',
									padding: 10,
									marginBottom: 10,
									borderRadius: 6,
								}}
							>
								<p>📅 Thời gian: {sch.dateTime}</p>
								<p>⏳ Thời lượng: {sch.duration} phút</p>
								<p>📘 Nội dung: {sch.content}</p>
								<p>📝 Ghi chú: {sch.note}</p>

								<Space>
									<Button
										onClick={() => {
											setEditingScheduleId(sch.id);
											setSelectedSubjectId(sch.subjectId);
											setDateTime(sch.dateTime);
											setDuration(sch.duration);
											setContent(sch.content);
											setNote(sch.note);
										}}
									>
										Sửa
									</Button>

									<Button
										danger
										onClick={() => {
											const updated = deleteSchedule(sch.id);
											setSchedules(updated);
										}}
									>
										Xóa
									</Button>
								</Space>
							</div>
						))}
				</div>
			)}
            <div>




                
			<h2>Thiết lập mục tiêu tháng</h2>

			<select value={goalSubjectId} onChange={(e) => setGoalSubjectId(e.target.value)}>
				<option value=''>Tổng thời lượng tháng</option>
				{subjects.map((sub) => (
					<option key={sub.id} value={sub.id}>
						{sub.name}
					</option>
				))}
			</select>

			<Input type='month' value={goalMonth} onChange={(e) => setGoalMonth(e.target.value)} />

			<Input
				type='number'
				placeholder='Mục tiêu (phút)'
				value={goalMinutes}
				onChange={(e) => setGoalMinutes(Number(e.target.value))}
			/>

			<Button
				onClick={() => {
					const updated = addGoal({
						subjectId: goalSubjectId || null,
						month: goalMonth,
						targetMinutes: goalMinutes,
					});
					setGoals(updated);
				}}
			>
				Thêm mục tiêu
			</Button>
			<h3>Danh sách mục tiêu</h3>

			{goals.map((goal) => {
				const actual = calculateMinutes(goal.month, goal.subjectId);
				const isCompleted = actual >= goal.targetMinutes;

				return (
					<div
						key={goal.id}
						style={{
							border: '1px solid #ccc',
							padding: 10,
							marginBottom: 10,
							borderRadius: 6,
							backgroundColor: isCompleted ? '#e6ffe6' : '#ffe6e6',
						}}
					>
						<p>📅 Tháng: {goal.month}</p>
						<p>📘 Môn: {goal.subjectId ? subjects.find((s) => s.id === goal.subjectId)?.name : 'Tổng tất cả'}</p>
						<p>🎯 Mục tiêu: {goal.targetMinutes} phút</p>
						<p>⏱ Đã học: {actual} phút</p>
						<p>Trạng thái: {isCompleted ? '✅ Đã đạt' : '❌ Chưa đạt'}</p>
					</div>
				);
			})}
            </div>
		</div>
	);
};

export default BaiTap2;
