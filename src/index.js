import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';

// 读取localStorage中的 user信息
import StorageUtils from './utils/StorageUtils.js'
import MemoryUtils from './utils/MemoryUtils.js'
const user = StorageUtils.getUser();
MemoryUtils.user = user;

ReactDOM.render(<App />, document.getElementById('root'));