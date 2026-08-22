import Foundation
import CoreImage
import Vision

let inputURL = URL(fileURLWithPath: "/Users/zaraiecastillo/.gemini/antigravity/scratch/zaraie-portfolio-site/profile.jpg")
guard let ciImage = CIImage(contentsOf: inputURL) else {
    print("Error loading input image")
    exit(1)
}

let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: ciImage, options: [:])
do {
    try handler.perform([request])
} catch {
    print("Vision request failed: \(error)")
    exit(1)
}

guard let result = request.results?.first,
      let maskPixelBuffer = try? result.generateScaledMaskForImage(forInstances: result.allInstances, from: handler) else {
    print("Error generating mask")
    exit(1)
}

let maskCI = CIImage(cvPixelBuffer: maskPixelBuffer)

// Scale mask to match original image dimensions exactly
let scaleX = ciImage.extent.width / maskCI.extent.width
let scaleY = ciImage.extent.height / maskCI.extent.height
let maskScaled = maskCI.transformed(by: CGAffineTransform(scaleX: scaleX, y: scaleY))

// Apply smooth threshold filter on mask to avoid harsh fringe
let filter = CIFilter(name: "CIBlendWithMask")!
filter.setValue(ciImage, forKey: kCIInputImageKey)
filter.setValue(CIImage(color: CIColor(red: 0, green: 0, blue: 0, alpha: 0)), forKey: kCIInputBackgroundImageKey)
filter.setValue(maskScaled, forKey: kCIInputMaskImageKey)

guard let outputCI = filter.outputImage else {
    print("Error blending mask")
    exit(1)
}

// Crucial: Preserve sRGB color space without linear conversion to prevent skin tone posterization/discoloration
let context = CIContext(options: [.workingColorSpace: NSNull()])
let outputURL = URL(fileURLWithPath: "/Users/zaraiecastillo/.gemini/antigravity/scratch/zaraie-portfolio-site/profile_cutout.png")
let sRGBSpace = CGColorSpace(name: CGColorSpace.sRGB)!

do {
    try context.writePNGRepresentation(of: outputCI, to: outputURL, format: .RGBA8, colorSpace: sRGBSpace)
    print("SUCCESS: Smooth sRGB Cutout saved to profile_cutout.png")
} catch {
    print("Error writing PNG: \(error)")
    exit(1)
}
