import accounts from './accounts';
import config from './config';
import * as constants from './constants';
import events from './events';
import experienceRatings from './experience_ratings';
import magic from './magic';
import messages from './messages/messages';
import prisma from './prisma';
import redis from './redis/_redis';
import room from './room/_room';
import serialization from './serialization';
import time from './time';
import wallpapers from './wallpapers';

export default {
  config,
  prisma,
  time,
  accounts,
  events,
  room,
  redis,
  magic,
  experienceRatings,
  wallpapers,
  messages,
  serialization,
  constants,
};
