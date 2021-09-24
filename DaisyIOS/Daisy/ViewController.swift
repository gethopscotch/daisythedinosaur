//
//  ViewController.swift
//  Daisy
//
//  Created by Samantha John on 9/22/21.
//

import UIKit
import WebKit

class ViewController: UIViewController {

    let webView = WKWebView(frame: .zero)
    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = #colorLiteral(red: 0.9122232199, green: 0.9865009189, blue: 0.9939107299, alpha: 1)
        view.addSubview(webView)
        webView.scrollView.isScrollEnabled = false
        webView.isOpaque = false
        webView.backgroundColor = #colorLiteral(red: 0.9122232199, green: 0.9865009189, blue: 0.9939107299, alpha: 1)
        let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "www")!
        webView.loadFileURL(url, allowingReadAccessTo: url)
        let request = URLRequest(url: url)
        webView.load(request)
    }

    var html: String {
        let filePath =  Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "www") ?? ""
        do {
            return try NSString(contentsOfFile: filePath, encoding: String.Encoding.utf8.rawValue) as String
        } catch {
            return ""
        }
    }
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        let webWidth = CGFloat(1024)
        let webHeight = CGFloat(768)
        webView.frame = view.frame
        let scaleX = view.frame.size.width / webWidth
        let scaleY = view.frame.size.height / webHeight
        webView.transform = CGAffineTransform.init(scaleX: scaleX, y: scaleY)
    }
    
    override var prefersStatusBarHidden: Bool { true }


}

