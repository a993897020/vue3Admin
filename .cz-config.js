'use strict';

module.exports = {
  types: [
    { value: '✨ feat', name: 'feat：增加了新功能' },
    { value: '🐛 fix', name: 'fix：修复bug' },
    { value: '📝 docs', name: 'docs：只改动了文档相关的内容' },
    {
      value: '💄 style',
      name: 'style：与代码逻辑无关的改动，例如删除空格、改变缩进、增删分号等',
    },
    { value: '♻️ refactor', name: 'refactor：代码重构，与bug修复和新功能无关' },
    { value: '⚡️ perf', name: 'perf：优化相关，比如提升性能、体验' },
    { value: '✅ test', name: 'test：测试用例，包括单元测试、集成测试等' },
    { value: '📦️ chore', name: 'chore：改变构建流程、或者增加依赖库、工具等' },
    { value: '🎉 release', name: 'release：发布正式版' },
    { value: '⏪️ revert', name: 'revert：版本回滚' },
    { value: '🌐 i18n', name: 'i18n：国际化' },
    { value: '🔐 safe', name: 'safe：安全修复' },
  ],
  // 覆盖消息，默认如下
  messages: {
    type: '选择一种你的提交类型:',
    scope: '选择一个scope (可选):',
    // 如果allowCustomScopes为真，则使用
    customScope: '自定义SCOPE:',
    subject: '短说明:\n',
    body: '长说明，使用"|"换行(可选)：\n',
    breaking: '非兼容性说明 (可选):\n',
    footer: '关联关闭的issue，例如：#31, #34(可选):\n',
    confirmCommit: '确定提交说明?',
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['特性', '修复'],
  subjectLimit: 100,
};
