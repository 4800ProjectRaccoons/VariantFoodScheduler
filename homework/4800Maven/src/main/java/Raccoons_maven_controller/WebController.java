package Raccoons_maven_controller;
import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class WebController {
	
	public static void main( String[] args ) throws IOException {
		String url = "https://slickdeals.net/";
    	Document doc = Jsoup.connect(url).get();
    	System.out.println(doc.title());
    	Elements newsHeadlines = doc.select("#mp-itn b a");
    	for (Element headline : newsHeadlines) {
    	  System.out.println( 
    	    headline.attr("title") + ", " + headline.absUrl("href"));
    	}
    }
}