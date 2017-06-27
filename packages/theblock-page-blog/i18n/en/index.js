// GPLv3, Copyright (C) 2017, theBlock, https://theblock.io
// @flow

import summary from './summary';

const entries = (process.env.BLOG_ENTRIES || '')
  .split(',')
  .reduce((resources, entry) => {
    resources[entry] = {
      intro: require(`../${entry}/en/intro.md`)
    };

    return resources;
  }, {});

// NOTE: For translations, the entry array can be skipped
export default Object.assign(entries, {
  summary
});
