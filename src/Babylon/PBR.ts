import { Scene, Engine, FreeCamera, Vector3, HemisphericLight, MeshBuilder, CubeTexture, PBRMaterial, Texture,Color3, GlowLayer } from '@babylonjs/core'

export class PBR {

  scene: Scene;
  engine: Engine; 

  constructor(private canvas:HTMLCanvasElement){
    this.engine = new Engine(this.canvas, true)
    this.scene = this.CreateScene()

    this.CreateEnvironment()  //有PBR不移出來會報錯

    this.engine.runRenderLoop(()=>{
      this.scene.render()
    })
  }

  CreateScene():Scene {
    const scene = new Scene(this.engine);

    const camera = new FreeCamera("camara", new Vector3(0,1,-5), this.scene)
    camera.attachControl()
    camera.speed = 0.25

    const hemiLight = new HemisphericLight(
      "hemiLight", 
      new Vector3(0,1,0), 
      this.scene
    );

    hemiLight.intensity = 0

    //環境貼圖

    const envTex = CubeTexture.CreateFromPrefilteredData("./env/sky.env", scene)

    scene.environmentTexture = envTex

    scene.createDefaultSkybox(envTex, true)

  
    return scene;
  }

  CreateEnvironment():void {
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

    ground.material = this.CreateAsphalt();
    ball.material = this.CreateMagic()
  }

  CreateAsphalt(): PBRMaterial {
    const pbr =  new PBRMaterial("pbr", this.scene)
    pbr.albedoTexture = new Texture("./textures/wall/wall_diff_4k.jpg")   //反照率紋理

    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen = true

    pbr.roughness = 1

    return pbr
  }

  CreateMagic(): PBRMaterial {
    const pbr = new PBRMaterial("pbr", this.scene)

    pbr.albedoTexture = new Texture("./textures/wall/wall_diff_4k.jpg", this.scene)

    pbr.roughness = 1

    //發光類似魔法
    pbr.emissiveIntensity = 1
    pbr.emissiveColor = new Color3(1,1,1)
    pbr.emissiveTexture = new Texture("./textures/wall/wall_diff_4k.jpg", this.scene)

    const glowLayer = new GlowLayer("glow", this.scene)
    glowLayer.intensity = 6

    return pbr
  }

}