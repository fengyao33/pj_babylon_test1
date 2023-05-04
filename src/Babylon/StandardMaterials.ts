import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, Texture, StandardMaterial } from '@babylonjs/core'

export class StandardMaterials {

  scene: Scene;
  engine: Engine; 

  constructor(private canvas:HTMLCanvasElement){
    this.engine = new Engine(this.canvas, true)
    this.scene = this.CreateScene()

    this.engine.runRenderLoop(()=>{
      this.scene.render()
    })
  }

  CreateScene():Scene {
    const scene = new Scene(this.engine);

    const camera = new FreeCamera("camara", new Vector3(0,1,-5), this.scene)
    camera.attachControl()
    camera.speed = 0.25;

    const hemiLight = new HemisphericLight(
      "hemiLight", 
      new Vector3(0,1,0), 
      this.scene
    );

    hemiLight.intensity = 1;

    const ground = MeshBuilder.CreateGround(
      "ground", 
      { width:10, height:10 }, 
      this.scene
    );

    const ball = MeshBuilder.CreateSphere(
      "ball",
      { diameter: 1 },
      this.scene
    )

    ball.position = new Vector3(0, 1, 0)

    ground.material = this.CreateGroundMaterial();
    ball.material = this.CreateBallMeterial()
    
    return scene;
  }

  CreateGroundMaterial(): StandardMaterial {
    const groundMat = new StandardMaterial("groundMat", this.scene)
    const uvScale = 4;
    const texArray: Texture[] = []

    const diffuseTex = new Texture(
      "./textures/wall/wall_diff_4K.jpg",
      this.scene
    )
    // diffuseTex.uScale = 4;  //單一調整UV
    // diffuseTex.vScale = 4;
    groundMat.diffuseTexture = diffuseTex
    texArray.push(diffuseTex)

    const normalTex = new Texture(
      "./textures/wall/wall_nor_4K.jpg",
      this.scene
    )
    groundMat.bumpTexture = normalTex
    texArray.push(normalTex)

    const aoTex = new Texture(
      "./textures/wall/wall_ao_4K.jpg",
      this.scene
    )
    groundMat.ambientTexture = aoTex;
    texArray.push(aoTex)

    texArray.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    })

    return groundMat
  }

  CreateBallMeterial(): StandardMaterial {
    const ballMat = new StandardMaterial("ballMat", this.scene)
    const uvScale = 1
    const texArray: Texture[] = []

    const diffuseTex = new Texture(
      "./textures/wall/wall_diff_4K.jpg",
      this.scene
    )
    // diffuseTex.uScale = 4;  //單一調整UV
    // diffuseTex.vScale = 4;
    ballMat.diffuseTexture = diffuseTex
    texArray.push(diffuseTex)

    const normalTex = new Texture(
      "./textures/wall/wall_nor_4K.jpg",
      this.scene
    )
    ballMat.bumpTexture = normalTex
    texArray.push(normalTex)

    const aoTex = new Texture(
      "./textures/wall/wall_ao_4K.jpg",
      this.scene
    )
    ballMat.ambientTexture = aoTex;
    ballMat.invertNormalMapX = true
    ballMat.invertNormalMapY = true
    texArray.push(aoTex)

    texArray.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    })

    return ballMat
  }

}