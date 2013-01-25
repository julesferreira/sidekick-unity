#pragma strict

private var original_scale: Vector3;

function Start () {
	original_scale = transform.localScale;
}

function Update () {

	var player_mana = GameObject.Find("player").GetComponent(Player).mana;
	var scale = original_scale;
	scale.x = player_mana/100.0*original_scale.x;
	transform.localScale = Vector3.Lerp (transform.localScale, scale, Time.deltaTime);
}