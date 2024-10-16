// 这里是模拟AI功能的简单实现，实际应用中需要集成真正的AI模型

export const prioritizeTask = (task) => {
  const priorityScores = {
    urgent: 4,
    high: 3,
    medium: 2,
    low: 1
  };

  // 简单的优先级评估逻辑
  const urgencyScore = Date.now() - new Date(task.dueDate).getTime() > 0 ? 4 : 2;
  const descriptionScore = task.description.length > 100 ? 3 : 2;

  const totalScore = urgencyScore + descriptionScore;

  if (totalScore >= 6) return 'urgent';
  if (totalScore >= 5) return 'high';
  if (totalScore >= 4) return 'medium';
  return 'low';
};

export const estimateTaskHours = (task) => {
  // 简单的工时估算逻辑
  const baseHours = 4;
  const complexityFactor = task.description.length / 50;
  return Math.round(baseHours * (1 + complexityFactor));
};

export const suggestTaskAssignee = (task, team) => {
  // 简单的任务分配逻辑
  const availableTeamMembers = team.filter(member => member.currentTasks < 3);
  if (availableTeamMembers.length === 0) return null;

  // 随机选择一个可用的团队成员
  const randomIndex = Math.floor(Math.random() * availableTeamMembers.length);
  return availableTeamMembers[randomIndex].name;
};