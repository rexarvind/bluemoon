jQuery(function ($) {

    AOS.init();

    $('.navbar-toggler').on('click', function() {
        jQuery('.headnev').css('background','#181e20e6');
    });
    if ( jQuery(window).scrollTop() > 100 ) {
        jQuery('.headnev').css('background','#181e20e6');
    }
    jQuery(window).bind('scroll', function () {
        if (jQuery(window).scrollTop() > 100) {
            jQuery('.headnev').css('background','#181e20e6');
        } else {
            jQuery('.headnev').css('background','transparent');
        }
    });

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = canvas.clientWidth;
        sizes.height = canvas.clientHeight;

        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    jQuery('.cwa_partners_slider').slick({
        centerMode: true,
        slidesToShow: 2,
        slidesToScroll: 1
    });

    const canvas = document.querySelector('#cwa_moon');
    const scene = new THREE.Scene();
    const loader = new THREE.GLTFLoader();
    var moon = new THREE.Object3D();

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });

    const sizes = {
        width: canvas.clientWidth,
        height: canvas.clientHeight
    };

    loader.load('https://dev-bluemoon.netlify.app/model/crate.glb', function ( gltf ) {
        moon = gltf.scene;
        moon.scale.set(1, 1, 1);
        moon.position.set(0, 0, -6);
        moon.rotation.set(0, 0, 0);
        scene.add(moon);
    }, undefined, function ( error ) {
        console.error( error );
    });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add( ambientLight );

    const directionalLight2 = new THREE.PointLight(0xf2f8ff, 10, 50);
    directionalLight2.position.set(8, 8, 15);
    scene.add( directionalLight2 );

    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 1, 10000 );
    camera.position.set(0, 0, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(camera);

    function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
        moon.rotation.y += 0.001;
    }
    animate();

});