# Proyecto Astro con Three.js y Corazones Flotantes
    
    Este proyecto demuestra cómo integrar Three.js en un proyecto Astro para renderizar un modelo 3D (.glb) con un fondo de partículas de corazones flotantes.
    
    ## Características
    
    * Carga y renderizado de modelos 3D (.glb) usando Three.js.
    * Controles de órbita para interactuar con el modelo.
    * Fondo de partículas de corazones flotantes con movimiento vertical.
    * Ajuste automático del tamaño del renderizador al redimensionar la ventana.
    * Código organizado en archivos separados para mayor claridad y mantenimiento.
    
    ## Tecnologías Utilizadas
    
    * [Astro](https://astro.build/): Framework web para construir sitios web rápidos con componentes UI.
    * [Three.js](https://threejs.org/): Librería JavaScript para crear gráficos 3D en el navegador.
    * [OrbitControls](https://threejs.org/examples/#misc_controls_orbit): Controles de cámara para Three.js.
    
    ## Instalación
    
    1.  Clona este repositorio.
    2.  Navega al directorio del proyecto.
    3.  Instala las dependencias:
        * `npm install`
        * o
        * `yarn add`
        * o
        * `pnpm add`
    4.  Inicia el servidor de desarrollo:
        * `npm run dev`
        * o
        * `yarn dev`
        * o
        * `pnpm dev`
    5.  Abre tu navegador en `http://localhost:3000`.
    
    ## Estructura del Proyecto
    
    * `src/`: Contiene el código fuente del proyecto.
        * `ThreeScene.js`: Lógica de la escena Three.js.
        * `MiEscena3D.astro`: Componente Astro que renderiza la escena Three.js.
    * `public/`: Contiene los activos estáticos (modelo .glb, textura del corazón).
    * `package.json`: Archivo de configuración de npm.
    * `astro.config.mjs`: Archivo de configuración de Astro.
    * `README.md`: Este archivo.
    
    ## Uso
    
    * El modelo 3D se muestra en el centro de la pantalla.
    * Puedes usar el ratón para rotar y hacer zoom en el modelo.
    * Los corazones flotan de abajo hacia arriba en el fondo.
    
    ## Personalización
    
    * Para cambiar el modelo 3D, reemplaza `public/model.glb` con tu propio modelo.
    * Para cambiar la textura del corazón, reemplaza `public/heart.png` con tu propia imagen.
    * Puedes ajustar los parámetros de las partículas en `src/ThreeScene.js` para modificar el comportamiento de los corazones.
    * Puedes cambiar el color de fondo de la escena en `src/ThreeScene.js`.
    
    ## Créditos
    
    * Este proyecto fue creado usando Astro y Three.js.
    
    ## Licencia
    
    Este proyecto está licenciado bajo la [MIT License](LICENSE).