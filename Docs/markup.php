<?php
	require_once('./markdown.php');
	$filePath = $_SERVER["DOCUMENT_ROOT"] . $_SERVER["REQUEST_URI"];
	$fileHandler = fopen($filePath, 'r');
	$fileContents = fread($fileHandler, filesize($filePath));
	fclose($fileHandler);
	$markup = Markdown($fileContents);
?>
<html>
	<head>
		<title><?php ereg('([a-z0-1A-Z]+)\.md$',$filePath,$match); echo $match[1]; ?> | MooTools Plugins</title>
	</head>
	<body>
		<div id="primaryContent">
			<?php echo $markup ?>
		</div>
	</body>
</html>
