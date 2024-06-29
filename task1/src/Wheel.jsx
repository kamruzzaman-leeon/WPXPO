
import React, { useState, useRef, useEffect } from 'react';
import './Wheel.css';

const Wheel = ({ segments }) => {
  const canvasRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [currentDeg, setCurrentDeg] = useState(0);
  const [maxRotation, setMaxRotation] = useState(0);
  const [pause, setPause] = useState(false);
  const [itemDegs, setItemDegs] = useState({});
  const [selectedSegment, setSelectedSegment] = useState(null);

  const toRad = (deg) => deg * (Math.PI / 180);
  const easeOutSine = (x) => Math.sin((x * Math.PI) / 2);
  const getPercent = (start, end, value) => (value - start) / (end - start);

  const colors = [
    { r: 255, g: 102, b: 51 },
    { r: 255, g: 179, b: 153 },
    { r: 255, g: 51, b: 255 },
    { r: 255, g: 255, b: 153 },
    { r: 0, g: 179, b: 230 },
    { r: 230, g: 179, b: 51 },
    { r: 51, g: 102, b: 230 },
    { r: 153, g: 153, b: 102 },
    { r: 153, g: 255, b: 153 },
    { r: 179, g: 77, b: 77 }
  ];

  const draw = (ctx) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const radius = ctx.canvas.width / 2 - 10;
    const step = 360 / segments.length;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, toRad(0), toRad(360));
    ctx.fillStyle = `rgb(33,33,33)`;
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    let startDeg = currentDeg;
    const updatedItemDegs = {};
    for (let i = 0; i < segments.length; i++, startDeg += step) {
      let endDeg = startDeg + step;

      const color = colors[i % colors.length];
      const colorStyle = `rgb(${color.r},${color.g},${color.b})`;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg));
      ctx.fillStyle = `rgb(${color.r - 30},${color.g - 30},${color.b - 30})`;
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 30, toRad(startDeg), toRad(endDeg));
      ctx.fillStyle = colorStyle;
      ctx.lineTo(centerX, centerY);
      ctx.fill();

      // draw text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(toRad((startDeg + endDeg) / 2));
      ctx.textAlign = 'center';
      ctx.fillStyle = (color.r > 150 || color.g > 150 || color.b > 150) ? '#000' : '#fff';
      ctx.font = 'bold 24px serif';
      ctx.fillText(segments[i], 130, 10);
      ctx.restore();

      updatedItemDegs[segments[i]] = {
        startDeg: startDeg,
        endDeg: endDeg
      };
    }
    setItemDegs(updatedItemDegs);
  };

  const animate = () => {
    if (pause) {
      return;
    }
    const newSpeed = easeOutSine(getPercent(currentDeg, maxRotation, 0)) * 20;
    if (newSpeed < 0.01) {
      setSpeed(0);
      setPause(true);
      setSpinning(false);
    } else {
      setSpeed(newSpeed);
    }
    setCurrentDeg((prevDeg) => prevDeg + newSpeed);
    window.requestAnimationFrame(animate);
  };

  const spin = () => {
    if (speed !== 0 || spinning || segments.length === 0) {
      return;
    }

    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * segments.length);
    const selectedSegment = segments[randomIndex];
    setSelectedSegment(selectedSegment);

    const endDeg = itemDegs[selectedSegment].endDeg;
    const randomFullCircles = 3 + Math.floor(Math.random() * 3); // Between 3 and 5 full circles
    setMaxRotation((randomFullCircles * 360) - endDeg + 10);
    setPause(false);
    setCurrentDeg(0);
    window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    draw(ctx);
  }, [currentDeg, segments]);

  useEffect(() => {
    if (selectedSegment) {
      document.getElementById('winner').innerHTML = `Winner: ${selectedSegment}`;
    }
  }, [selectedSegment]);

  return (
    <div className="wheel-wrapper">
      <canvas ref={canvasRef} width={400} height={400}></canvas>
      <div className="center-circle"></div>
      <div className="pointer"></div>
      <button id="spin-btn" onClick={spin} style={{ display: 'none' }}></button>
    </div>
  );
};

export default Wheel;
