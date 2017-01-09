(function(skuid){
	skuid.componentType.register("test__sayhello",function(element,xmlDef){
		element.addClass("hello-content").html("<b>Hello " + xmlDef.attr("person") + "</b>");
	});
})(skuid);