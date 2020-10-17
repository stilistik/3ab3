interface ColorClass {
  color: string;
  cls: 'low' | 'medium' | 'high';
}

export const getBalanceColorClass = (balance: number): ColorClass => {
  if (balance > -30) {
    return {
      color: '#5BA05E',
      cls: 'low',
    };
  } else if (balance <= -30 && balance >= -60) {
    return {
      color: '#FFA000',
      cls: 'medium',
    };
  } else {
    return {
      color: '#CC4949',
      cls: 'high',
    };
  }
};

/*
 * Function to save JSON to file from browser
 * adapted from http://bgrins.github.io/devtools-snippets/#console-save
 * @param {Object} data -- json object to save
 * @param {String} file -- file name to save to
 */
export function saveJSON(data: any, filename: string) {
  if (!data) {
    console.error('No data');
    return;
  }

  if (!filename) filename = 'console.json';

  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 4);
  }

  var blob = new Blob([data], { type: 'text/json' }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a');

  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
  e.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
}
