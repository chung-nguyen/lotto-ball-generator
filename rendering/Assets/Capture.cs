using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.IO;

public class Capture : MonoBehaviour
{
	public static string ScreenshotFolderPath => $"{Application.dataPath}/Shots";
	
	public MeshRenderer sphereMesh;
	
	private int index;
	
    // Start is called before the first frame update
    void Start()
    {
		index = 0;
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyUp(KeyCode.K))
		{
			CreateCubeMap(index);
			index++;
		}
    }
	
	void CreateCubeMap (int i) 
	{
		var myTexture = Resources.Load ("Nums/" + i) as Texture;
		sphereMesh.sharedMaterial.SetTexture("_MainTex", myTexture);
		GeneratePng(i);
	}
	
	public void GeneratePng(int i)
    {
        try
        {
            if (!Directory.Exists(ScreenshotFolderPath))
            {
                Directory.CreateDirectory(ScreenshotFolderPath);
            }

            var camera = Camera.main;
            string filename = ScreenshotFolderPath + "/" + i + ".png";

            var renderTexture = new RenderTexture(2048, 2048, 24);
            camera.targetTexture = renderTexture;
            var screenShot = new Texture2D(2048, 2048, TextureFormat.ARGB32, false);
            screenShot.alphaIsTransparency = true;
            camera.Render();
            RenderTexture.active = renderTexture;
            screenShot.ReadPixels(new Rect(0, 0, 2048, 2048), 0, 0);
            camera.targetTexture = null;
            RenderTexture.active = null;

            DestroyImmediate(renderTexture);

            byte[] bytes = screenShot.EncodeToPNG();
            System.IO.File.WriteAllBytes(filename, bytes);

            Debug.Log(string.Format("Took screenshot to: {0}", filename));
        }
        catch (System.Exception ex)
        {
            Debug.LogError($"{ex}");
        }
    }
}
