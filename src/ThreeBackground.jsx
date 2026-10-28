import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const scene = new THREE.Scene()
    const cam = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 2000)
    cam.position.z = 500
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(innerWidth, innerHeight)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    // Star particles
    const count = 2500
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#7C3AED'),
      new THREE.Color('#F59E0B'),
      new THREE.Color('#06B6D4'),
      new THREE.Color('#ffffff'),
      new THREE.Color('#A78BFA'),
    ]
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random()-0.5)*1800
      pos[i*3+1] = (Math.random()-0.5)*1800
      pos[i*3+2] = (Math.random()-0.5)*1500
      const c = palette[Math.floor(Math.random()*palette.length)]
      col[i*3]=c.r; col[i*3+1]=c.g; col[i*3+2]=c.b
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos,3))
    geo.setAttribute('color', new THREE.BufferAttribute(col,3))
    const mat = new THREE.PointsMaterial({
      size:1.8, vertexColors:true, transparent:true,
      opacity:0.75, blending:THREE.AdditiveBlending, depthWrite:false, sizeAttenuation:true
    })
    const stars = new THREE.Points(geo, mat)
    scene.add(stars)

    // Floating rings
    const rings = []
    for (let i=0; i<4; i++){
      const rg = new THREE.TorusGeometry(60+i*40, 0.8, 8, 80)
      const rm = new THREE.MeshBasicMaterial({ color: i%2===0?0x7C3AED:0xF59E0B, transparent:true, opacity:0.08 })
      const r = new THREE.Mesh(rg, rm)
      r.rotation.x = Math.random()*Math.PI
      r.rotation.y = Math.random()*Math.PI
      r.position.set((Math.random()-.5)*600,(Math.random()-.5)*600, -200)
      r.userData = { rx: (Math.random()-.5)*0.004, ry:(Math.random()-.5)*0.004 }
      rings.push(r); scene.add(r)
    }

    let mx=0, my=0, tx=0, ty=0
    const onMouse = e => { mx=(e.clientX/innerWidth-.5)*60; my=(e.clientY/innerHeight-.5)*40 }
    const onResize = () => { cam.aspect=innerWidth/innerHeight; cam.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight) }
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('resize', onResize)

    let t=0, raf
    const tick = () => {
      raf = requestAnimationFrame(tick); t+=0.003
      tx += (mx-tx)*0.04; ty += (my-ty)*0.04
      cam.position.x=tx; cam.position.y=-ty
      stars.rotation.y = t*0.015; stars.rotation.x = t*0.005
      rings.forEach(r => { r.rotation.x+=r.userData.rx; r.rotation.y+=r.userData.ry })
      mat.opacity = 0.6+Math.sin(t)*0.12
      renderer.render(scene, cam)
    }
    tick()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove',onMouse); window.removeEventListener('resize',onResize); renderer.dispose() }
  },[])
  return <canvas ref={ref} id="gz-canvas"/>
}
