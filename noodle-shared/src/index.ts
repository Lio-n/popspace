import api from './api/_api';
import db from './db/_index';
import error from './error/_error';
import lib from './lib/_index';
import models from './models/_models';
import net from './net/_net';

const shared = {
  db,
  lib,
  error,
  models,
  api,
  net,
  init: async () => {},
  cleanup: async () => {},
};

export default shared;

export { default as prisma } from './db/prisma';
export * from '@prisma/client';
