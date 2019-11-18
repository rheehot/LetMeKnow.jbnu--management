const MediMenus = require('../models/mediMenus');
const JinsuMenus = require('../models/jinsuMenus');
const StudentHallMenus = require('../models/studentHallMenus');
const JungdamMenus = require('../models/jungdamMenus');
const HuMenus = require('../models/huMenus');

const RedesignMenu = meals => meals.map(meal => ({ ...meal, menus: meal.menus || '등록된 식단이 없습니다.' }));

exports.getMediMenus = async () => {
  const menu = await MediMenus.getLatestMenu();

  if (!menu) {
    return null;
  }

  menu.lunch = RedesignMenu(menu.lunch);
  menu.dinner = RedesignMenu(menu.dinner);

  return menu;
};

exports.getJinsuMenus = async () => {
  const menu = await JinsuMenus.getLatestMenu();

  if (!menu) {
    return null;
  }

  menu.lunch = RedesignMenu(menu.lunch);
  menu.dinner = RedesignMenu(menu.dinner);

  return menu;
};

exports.getStudentHallMenus = async () => {
  const menu = await StudentHallMenus.getLatestMenu();

  if (!menu) {
    return null;
  }

  menu.lunch = RedesignMenu(menu.lunch);
  menu.dinner = RedesignMenu(menu.dinner);

  return menu;
};

exports.getJungdamMenus = async () => {
  const menu = await JungdamMenus.getLatestMenu();

  if (!menu) {
    return null;
  }

  menu.lunch = RedesignMenu(menu.lunch);

  return menu;
};

exports.getHuMenus = async () => {
  const menu = await HuMenus.getLatestMenu();

  if (!menu) {
    return null;
  }

  menu.breakfast = RedesignMenu(menu.breakfast);
  menu.lunch = RedesignMenu(menu.lunch);
  menu.dinner = RedesignMenu(menu.dinner);

  return menu;
};
