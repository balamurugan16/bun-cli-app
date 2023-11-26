#!/usr/bin/env bun

import './src/command';
import { note_table_query } from './src/db';

note_table_query.run();
