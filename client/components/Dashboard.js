import React, { Component } from 'react'
import { SpriteText2D, textAlign } from 'three-text2d'

export class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var $globe = $('#globe');
    var renderer = new THREE.WebGLRenderer({antialias: true});
    var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10000);
    var scene = new THREE.Scene();

    scene.background = new THREE.Color(0xeeeeee);
    scene.add(camera);
    renderer.setSize(window.innerWidth, window.innerHeight);
    $globe.append(renderer.domElement);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 100;
    camera.position.y = 100;

    var golf = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shading: THREE.FlatShading,
      fog: false
    });

    var L1 = new THREE.PointLight(0xffffff, 1);
    L1.position.x = 2000;
    L1.position.y = 2000;
    L1.position.z = 2000;
    scene.add(L1);

    var L3 = new THREE.PointLight(0xffffff, .4);
    L3.position.z = 400;
    scene.add(L3);

    var globe = new THREE.Mesh(new THREE.TetrahedronGeometry(100, 4), golf);
    var sprite1 = new SpriteText2D("Welcome to Journey", { align: textAlign.center,  font: '18px Helvetica', fillStyle: '#000000' , antialias: false });
    var sprite2 = new SpriteText2D("Let's embark on your path together", { align: textAlign.center,  font: '18px Helvetica', fillStyle: '#000000' , antialias: false });
    var sprite3 = new SpriteText2D("This place will be your memory palace", { align: textAlign.center,  font: '18px Helvetica', fillStyle: '#000000' , antialias: false });
    var sprite4 = new SpriteText2D("Uncage your thoughts in this safe place", { align: textAlign.center,  font: '18px Helvetica', fillStyle: '#000000' , antialias: false });

    globe.add(sprite1);
    globe.add(sprite2);
    globe.add(sprite3);
    globe.add(sprite4);

    sprite1.position.set(0, 120, 0);
    sprite2.position.set(0, 0, -120);
    sprite3.position.set(0, -120, 0);
    sprite4.position.set(0, 0, 120);

    scene.add(globe);

    var update = function() {
      // globe.rotation.x += .005;
      globe.rotation.x += .01;
      globe.rotation.y += .0000;
    };

    var render = function() {
      window.requestAnimationFrame(render);
      renderer.render(scene, camera);
      update();
    };

    render();

    var onWindowResize = function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );
    };
    window.addEventListener('resize', onWindowResize, false);
  }

  render() {
    return (
      <div className="dashboard-container">
        <div id="globe"></div>
      </div>
    )
  }
}