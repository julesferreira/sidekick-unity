#pragma strict

private var original_scale: Vector3;

function Start () {
	original_scale = transform.localScale;
}

function Update () {
	var hero_health: int;
	if (GameObject.Find("hero") != null)
	{
		hero_health = GameObject.Find("hero").GetComponent(Hero).health;
	}
	else
	{
		hero_health = 0;
	}
	var scale = original_scale;
	scale.x = hero_health/100.0*original_scale.x;
	transform.localScale = Vector3.Lerp (transform.localScale, scale, Time.deltaTime*10);
}