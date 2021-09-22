//
//  ViewController.swift
//  Daisy
//
//  Created by Samantha John on 9/22/21.
//

import UIKit
import WebKit

class ViewController: UIViewController {

    let webview = WKWebView(frame: .zero)
    override func viewDidLoad() {
        super.viewDidLoad()
        view.addSubview(webview)
        webview.loadHTMLString("hello world", baseURL: nil)
        // Do any additional setup after loading the view.
    }
    
    override func viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        webview.frame = view.frame
    }
    
    override var prefersStatusBarHidden: Bool { true }


}

