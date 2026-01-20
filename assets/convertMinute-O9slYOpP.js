function t(r){if(!r||r<0)return null;const e=Math.floor(r/60),n=r%60;return e>0&&n===0?`${e} ч`:e>0&&n>0?`${e} ч ${n} мин`:`${n} мин`}export{t as c};
