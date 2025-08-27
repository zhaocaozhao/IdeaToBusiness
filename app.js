const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const state = {
  title: '',
  subtitle: '',
  price: '',
  image: null,
  theme: 'vibrant',
  template: 'single-left'
};

const themes = {
  vibrant: { bg: '#FFF3EC', text: '#2B2B2B', accent: '#FF6D00' },
  tech: { bg: '#F5F5F5', text: '#222', accent: '#0091EA' },
  dark: { bg: '#212121', text: '#FFFFFF', accent: '#FF8A50' },
  milk: { bg: '#FFFFFF', text: '#333333', accent: '#FF8A50' },
  mint: { bg: '#E8F5E9', text: '#2E7D32', accent: '#43A047' }
};

function render() {
  const theme = themes[state.theme];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = theme.text;
  ctx.textBaseline = 'top';

  if (state.template === 'single-left') {
    const imgW = canvas.width * 0.45;
    const imgH = canvas.height - 120;
    if (state.image) {
      ctx.drawImage(state.image, 40, (canvas.height - imgH) / 2, imgW, imgH);
    } else {
      ctx.fillStyle = '#ccc';
      ctx.fillRect(40, (canvas.height - imgH) / 2, imgW, imgH);
      ctx.fillStyle = theme.text;
    }
    const textX = imgW + 80;
    let y = 80;
    ctx.font = 'bold 48px system-ui';
    ctx.fillText(state.title, textX, y);
    y += 72;
    ctx.font = '24px system-ui';
    ctx.fillText(state.subtitle, textX, y);
    y += 48;
    if (state.price) {
      ctx.fillStyle = theme.accent;
      ctx.font = 'bold 40px system-ui';
      ctx.fillText(state.price, textX, y);
      ctx.fillStyle = theme.text;
    }
  } else if (state.template === 'single-top') {
    const imgW = canvas.width * 0.7;
    const imgH = canvas.height * 0.5;
    if (state.image) {
      ctx.drawImage(state.image, (canvas.width - imgW) / 2, 40, imgW, imgH);
    } else {
      ctx.fillStyle = '#ccc';
      ctx.fillRect((canvas.width - imgW) / 2, 40, imgW, imgH);
      ctx.fillStyle = theme.text;
    }
    let y = imgH + 80;
    ctx.font = 'bold 48px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(state.title, canvas.width / 2, y);
    y += 60;
    ctx.font = '24px system-ui';
    ctx.fillText(state.subtitle, canvas.width / 2, y);
    y += 48;
    if (state.price) {
      ctx.fillStyle = theme.accent;
      ctx.font = 'bold 40px system-ui';
      ctx.fillText(state.price, canvas.width / 2, y);
      ctx.fillStyle = theme.text;
    }
    ctx.textAlign = 'left';
  }
}

function bindControls() {
  document.getElementById('titleInput').addEventListener('input', e => {
    state.title = e.target.value;
    render();
  });
  document.getElementById('subtitleInput').addEventListener('input', e => {
    state.subtitle = e.target.value;
    render();
  });
  document.getElementById('priceInput').addEventListener('input', e => {
    state.price = e.target.value;
    render();
  });
  document.getElementById('themeSelect').addEventListener('change', e => {
    state.theme = e.target.value;
    render();
  });
  document.getElementById('templateSelect').addEventListener('change', e => {
    state.template = e.target.value;
    render();
  });
  document.getElementById('imageInput').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      state.image = img;
      render();
    };
    img.src = URL.createObjectURL(file);
  });
  document.getElementById('loadData').addEventListener('click', () => {
    const text = document.getElementById('jsonData').value;
    try {
      const data = JSON.parse(text);
      if (data.meta) {
        state.title = data.meta.title || state.title;
        state.subtitle = data.meta.cta || state.subtitle;
      }
      if (data.products && data.products[0]) {
        state.price = data.products[0].price_text || '';
        if (data.products[0].image_url) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            state.image = img;
            render();
          };
          img.src = data.products[0].image_url;
        }
      }
      if (data.canvas && data.canvas.theme) {
        state.theme = data.canvas.theme;
        document.getElementById('themeSelect').value = state.theme;
      }
      render();
      document.getElementById('titleInput').value = state.title;
      document.getElementById('subtitleInput').value = state.subtitle;
      document.getElementById('priceInput').value = state.price;
    } catch (err) {
      alert('JSON 解析失败');
    }
  });
  document.getElementById('exportPng').addEventListener('click', () => {
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cover.png';
    a.click();
  });
}

bindControls();
render();
