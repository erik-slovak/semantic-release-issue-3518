/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2022-08-21T13:08:66+02:00
 * @Copyright: Technology Studio
**/

const plugins = [
  ['@semantic-release/commit-analyzer', {
    preset: 'conventionalcommits',
    releaseRules: [
      { breaking: true, release: 'major' },
      { revert: true, release: 'patch' },
      { type: 'docs', release: 'patch' },
      { type: 'feat', release: 'minor' },
      { type: 'fix', release: 'patch' },
      { type: 'perf', release: 'patch' },
      { type: 'refactor', release: 'patch' },
      { scope: 'no-release', release: false },
    ],
  }],
  ['@semantic-release/release-notes-generator', {
    preset: 'conventionalcommits',
    presetConfig: {
      types: [
        { type: 'build', section: 'Build system / dependencies' },
        { type: 'ci', section: 'CI' },
        { type: 'docs', section: 'Documentation' },
        { type: 'feat', section: 'Features' },
        { type: 'fix', section: 'Bug fixes' },
        { type: 'perf', section: 'Performance' },
        { type: 'refactor', section: 'Refactoring' },
        { type: 'test', section: 'Testing' },
      ],
    },
  }],
  // ['semantic-release-slack-bot',
  //   {
  //     notifyOnSuccess: true,
  //     notifyOnFail: true,
  //   },
  // ],
  '@semantic-release/changelog',
  '@semantic-release/npm',
  '@semantic-release/github',
]

if (process.env.GITHUB_REF_NAME === 'main') {
  plugins.push([
    '@semantic-release/git',
    {
      assets: ['CHANGELOG.md', 'package.json'],
    },
  ])
}

module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    'next',
    'next-major',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
  plugins,
}
