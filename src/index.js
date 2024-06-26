const letters = require('./letters.json');
const letters_knife = require('telephone-booth');
const cangjie = require('./cangjie.json');

class Calendar {
  constructor(string, d = false) {
    this.debug = d;
    this.phrase = string || '';
    this.result = [];

    this.parse();
    this.translate();
  }

  getType(letter) {
    if (letter === 'a' || letter === 'e' || letter === 'i' || letter === 'o' || letter === 'u') {
      return 'vowels';
    }

    return 'consonants';
  }

  getValues(r) {
    // Get result for wide
    let syllable = false;
    let syllable_letters = [];
    let n = [];

    r.web.forEach((_l, i) => {
      let letter_type_group = this.getType(_l.l);

      if (!syllable_letters.length) {
        syllable = true;
        syllable_letters.push(_l.l);

        n.push(_l.v);
      } else {
        let not_a_syllable_of = (letter) => { !letters_knife[letter]['waits_for'][letter_type_group].includes(_l.l) };
        let not_a_syllable_after_of = (letter) => { return letters_knife[letter]['waits_for']['_after'][_l.l] === undefined };
        let syllable_after_of = (letter) => { return letters_knife[letter]['waits_for']['_after'][_l.l] };

        if (syllable_letters.length === 1 && not_a_syllable_of(syllable_letters[0])) {
          syllable_letters = [_l.l];

          n.push(_l.v);
        } else if (syllable_letters.length === 2 && not_a_syllable_after_of(syllable_letters[1])) {
          syllable_letters = [_l.l];

          n.push(_l.v);
        } else if (syllable_letters.length >= 3 && syllable_after_of(syllable_letters[1])) { //del
          let a = syllable_letters[0];
          let b = syllable_letters[1];
          let c = syllable_letters[2];
          let d = letters_knife[b]['waits_for']['_after'][c];

          let syllable_word = '';
          let size = syllable_letters.length;
          let word = a + b + c;
          let checksum = false;

          for (let i = 0; i < size; i++) syllable_word += syllable_letters[i];

          for (let i = 0; i < d.length; i++) if (!checksum && (word + d[i]).includes(syllable_word)) checksum = true;

          if (!checksum) {
            syllable_letters = [_l.l];

            n.push(_l.v);
          }
        } else {
          syllable_letters.push(_l.l);
        }
      }
    });

    if (this.debug) console.log(n);

    return n;
  }

  parse() {
    this.phrase = this.phrase.toLowerCase()
      .normalize("NFD")
      .replaceAll(/[,.!?"]/g, '')
      .replaceAll(/[-']/g, ' ')
      .replace(/[\u0300-\u036f]/g, "")
      .split(' ');
  }

  translate() {
    this.phrase.forEach((word) => {
      let w = Object.values(word);
      let f = w[0];
      
      this[f].call(this, word, w);
    });
  }

  a(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['twenty'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });
    
    let n = this.getValues(result);

    if (n.length >= 2) { // DNA
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['bamboo'];
          break;

        case 'function':
          result.wide = cangjie['day'];
          break;

        case 'behavior':
          result.wide = cangjie['ten'];
          break;

        case 'result':
          result.wide = cangjie['female'];
          break;
      }
    }

    this.result.push(result);
  }

  b(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['dagger-axe'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['corpse'];
          break;

        case 'function':
          result.wide = cangjie['middle'];
          break;

        case 'behavior':
          result.wide = cangjie['disaster'];
          break;

        case 'result':
          result.wide = cangjie['bamboo'];
          break;
      }
    }

    this.result.push(result);
  }

  c(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['hand'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['twenty'];
          break;

        case 'function':
          result.wide = cangjie['middle'];
          break;

        case 'behavior':
          result.wide = cangjie['day'];
          break;

        case 'result':
          result.wide = cangjie['dagger-axe'];
          break;
      }
    }

    this.result.push(result);
  }

  d(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['moon'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['heart'];
          break;

        case 'function':
          result.wide = cangjie['bow'];
          break;

        case 'behavior':
          result.wide = cangjie['mountain'];
          break;

        case 'result':
          result.wide = cangjie['people'];
          break;
      }
    }

    this.result.push(result);
  }

  e(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['moon'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['wood'];
          break;

        case 'function':
          result.wide = cangjie['big'];
          break;

        case 'behavior':
          result.wide = cangjie['mouth'];
          break;

        case 'result':
          result.wide = cangjie['gold'];
          break;
      }
    }

    this.result.push(result);
  }

  f(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['water'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['big'];
          break;

        case 'function':
          result.wide = cangjie['gold'];
          break;

        case 'behavior':
          result.wide = cangjie['bow'];
          break;

        case 'result':
          result.wide = cangjie['mountain'];
          break;
      }
    }

    this.result.push(result);
  }

  g(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['water'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['corpse'];
          break;

        case 'function':
          result.wide = cangjie['female'];
          break;

        case 'behavior':
          result.wide = cangjie['bamboo'];
          break;

        case 'result':
          result.wide = cangjie['wood'];
          break;
      }
    }

    this.result.push(result);
  }

  h(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['water'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['wood'];
          break;

        case 'function':
          result.wide = cangjie['middle'];
          break;

        case 'behavior':
          result.wide = cangjie['mountain'];
          break;

        case 'result':
          result.wide = cangjie['fire'];
          break;
      }
    }

    this.result.push(result);
  }

  i(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['one'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'function':
          result.wide = cangjie['earth'];
          break;

        case 'behavior':
          result.wide = cangjie['wood'];
          break;

        case 'result':
          result.wide = cangjie['female'];
          break;
      }
    }

    this.result.push(result);
  }

  j(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['bow'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['water'];
          break;

        case 'function':
          result.wide = cangjie['middle'];
          break;

        case 'behavior':
          result.wide = cangjie['predict'];
          break;

        case 'result':
          result.wide = cangjie['female'];
          break;
      }
    }

    this.result.push(result);
  }

  k(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['predict'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['day'];
          break;

        case 'function':
          result.wide = cangjie['disaster'];
          break;

        case 'behavior':
          result.wide = cangjie['day'];
          break;

        case 'result':
          result.wide = cangjie['field'];
          break;
      }
    }

    this.result.push(result);
  }

  l(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['people'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['ten'];
          break;

        case 'function':
          result.wide = cangjie['gold'];
          break;

        case 'behavior':
          result.wide = cangjie['big'];
          break;

        case 'result':
          result.wide = cangjie['field'];
          break;
      }
    }

    this.result.push(result);
  }

  m(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['mouth'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['fire'];
          break;

        case 'function':
          result.wide = cangjie['moon'];
          break;

        case 'behavior':
          result.wide = cangjie['bow'];
          break;

        case 'result':
          result.wide = cangjie['big'];
          break;
      }
    }

    this.result.push(result); 
  }

  n(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['heart'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['disaster'];
          break;

        case 'function':
          result.wide = cangjie['water'];
          break;

        case 'behavior':
          result.wide = cangjie['moon'];
          break;

        case 'result':
          result.wide = cangjie['disaster'];
          break;
      }
    }

    this.result.push(result); 
  }

  o(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['mouth'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'function':
          result.wide = cangjie['heart'];
          break;

        case 'behavior':
          result.wide = cangjie['mountain'];
          break;

        case 'result':
          result.wide = cangjie['moon'];
          break;
      }
    }

    this.result.push(result); 
  }

  p(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['bow'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['corpse'];
          break;

        case 'function':
          result.wide = cangjie['bamboo'];
          break;

        case 'behavior':
          result.wide = cangjie['fire'];
          break;

        case 'result':
          result.wide = cangjie['wood'];
          break;
      }
    }

    this.result.push(result); 
  }

  q(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['moon'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['twenty'];
          break;

        case 'function':
          result.wide = cangjie['wood'];
          break;

        case 'behavior':
          result.wide = cangjie['corpse'];
          break;

        case 'result':
          result.wide = cangjie['one'];
          break;
      }
    }

    this.result.push(result); 
  }

  r(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['twenty'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['field'];
          break;

        case 'function':
          result.wide = cangjie['hand'];
          break;

        case 'behavior':
          result.wide = cangjie['heart'];
          break;

        case 'result':
          result.wide = cangjie['one'];
          break;
      }
    }

    this.result.push(result); 
  }

  s(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['water'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['bamboo'];
          break;

        case 'function':
          result.wide = cangjie['corpse'];
          break;

        case 'behavior':
          result.wide = cangjie['heart'];
          break;

        case 'result':
          result.wide = cangjie['gold'];
          break;
      }
    }

    this.result.push(result); 
  }

  t(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['twenty'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['heart'];
          break;

        case 'function':
          result.wide = cangjie['mouth'];
          break;

        case 'behavior':
          result.wide = cangjie['big'];
          break;

        case 'result':
          result.wide = cangjie['moon'];
          break;
      }
    }

    this.result.push(result); 
  }

  u(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['water'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['day'];
          break;

        case 'function':
          result.wide = cangjie['female'];
          break;

        case 'behavior':
          result.wide = cangjie['dagger-axe'];
          break;

        case 'result':
          result.wide = cangjie['bamboo'];
          break;
      }
    }

    this.result.push(result); 
  }

  v(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['mouth'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['mountain'];
          break;

        case 'function':
          result.wide = cangjie['day'];
          break;

        case 'behavior':
          result.wide = cangjie['earth'];
          break;

        case 'result':
          result.wide = cangjie['heart'];
          break;
      }
    }

    this.result.push(result); 
  }

  w(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['water'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['people'];
          break;

        case 'function':
          result.wide = cangjie['wood'];
          break;

        case 'behavior':
          result.wide = cangjie['corpse'];
          break;

        case 'result':
          result.wide = cangjie['water'];
          break;
      }
    }

    this.result.push(result); 
  }

  x(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['bow'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'behavior':
          result.wide = cangjie['gold'];
          break;

        case 'result':
          result.wide = cangjie['fire'];
          break;
      }
    }

    this.result.push(result); 
  }

  y(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['hand'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['field'];
          break;

        case 'function':
          result.wide = cangjie['bamboo'];
          break;

        case 'behavior':
          result.wide = cangjie['wood'];
          break;

        case 'result':
          result.wide = cangjie['earth'];
          break;
      }
    }

    this.result.push(result); 
  }

  z(word, w) {
    let _letters = [];
    let result = {
      word,
      wide: cangjie['mouth'],
      web: []
    };
    
    w.forEach((l) => {
      result.web.push({
        l,
        v: letters[l]
      });
    });

    let n = this.getValues(result);

    if (n.length >= 2) {
      switch(n[1]) {
        case 'value':
          result.wide = cangjie['day'];
          break;

        case 'function':
          result.wide = cangjie['middle'];
          break;

        case 'behavior':
          result.wide = cangjie['female'];
          break;

        case 'result':
          result.wide = cangjie['predict'];
          break;
      }
    }

    this.result.push(result); 
  }
}

module.exports.Calendar = Calendar;
